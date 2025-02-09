export function paramUtils<T extends Record<string, any>>(data: T): { [key: string]: string | number | boolean } | URLSearchParams | string {
    if (data instanceof URLSearchParams || typeof data === 'string') {
        return data; // If already a URLSearchParams or string, return as is
    }

    if (typeof data === 'object' && data !== null && !Array.isArray(data)) { // Check for regular object
        const params: { [key: string]: string | number | boolean } = {};

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];

                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        value.forEach((item, index) => {
                            if (typeof item === 'object' && item !== null) {
                                for (const nestedKey in item) {
                                    if (item.hasOwnProperty(nestedKey)) {
                                        params[`${key}[${index}][${nestedKey}]`] = item[nestedKey].toString();
                                    }
                                }
                            } else {
                                params[`${key}[${index}]`] = item.toString();
                            }
                        });
                    } else if (typeof value === 'object' && value !== null) {
                        for (const nestedKey in value) {
                            if (value.hasOwnProperty(nestedKey)) {
                                if (typeof value[nestedKey] === 'object' && value[nestedKey] !== null) {
                                    for (const doubleNestedKey in value[nestedKey]) {
                                        if (value[nestedKey].hasOwnProperty(doubleNestedKey)) {
                                            params[`${key}[${nestedKey}][${doubleNestedKey}]`] = value[nestedKey][doubleNestedKey].toString();
                                        }
                                    }
                                } else {
                                    params[`${key}[${nestedKey}]`] = value[nestedKey].toString();
                                }
                            }
                        }
                    } else {
                        params[key] = value; // Assign directly if it's a primitive type
                    }
                }
            }
        }
        return params;
    }

    return {}; // Return empty object if input is invalid
}

