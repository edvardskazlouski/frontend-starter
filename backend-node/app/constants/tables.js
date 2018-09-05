export const TABLES = {
    ACTIVATION_MAILS: {
        NAME: 'activation_mails',
        COLUMNS: {
            EMAIL: 'email',
            CREATION_DATE: 'creation_date',
            STATUS: 'status',
        }
    },

    COLORS: {
        NAME: 'colors',
        COLUMNS: {
            NAME: 'name',
            CODE: 'code',
        }
    },

    COLORS_CODES: {
        NAME: 'colors_codes',
        COLUMNS: {
            CODE: 'code',
            COLOR_ID: 'color_id',
            COMPANY_ID: 'company_id',
        }
    },

    COMPANIES: {
        NAME: 'companies',
        COLUMNS: {
            NAME: 'name',
        }
    },

    COMPANIES_USERS_ROLES: {
        NAME: 'companies_users_roles',
        COLUMNS: {
            COMPANY_ID: 'company_id',
            USER_ID: 'user_id',
            ROLE_ID: 'role_id'
        },
    },

    FACTORIES: {
        NAME: 'factories',
        COLUMNS: {
            NAME: 'name',
            COMPANY_ID: 'company_id'
        },
    },

    RESET_PASSWORD_MAILS: {
        NAME: 'reset_password_mails',
        COLUMNS: {
            EMAIL: 'email',
            CREATION_DATE: 'creation_date',
            STATUS: 'status',
        }
    },

    SERIES_IDENTIFIERS: {
        NAME: 'series_identifiers',
        COLUMNS: {
            NAME: 'name',
            FACTORY_ID: 'factory_id'
        }
    },

    SIZES_TYPES: {
        NAME: 'sizes_types',
        COLUMNS: {
            SIZE_TYPE: 'size_type',
            COMPANY_ID: 'company_id'
        }
    },

    SIGN_UP_CODES: {
        NAME: 'sign_up_codes',
        COLUMNS: {
            CODE: 'code',
        },
    },

    USERS: {
        NAME: 'users',
        COLUMNS: {
            ID: 'id',
            EMAIL: 'email',
            PASSWORD: 'password',
            KEY: 'key',
            FIRST_NAME: 'first_name',
            LAST_NAME: 'last_name',
            IS_ACTIVE: 'is_active',
        },
    },

    USER_ROLES: {
        NAME: 'user_roles',
        COLUMNS: {
            ROLE: 'role',
        }
    },

    PLACES: {
        NAME: 'places',
        COLUMNS: {
            COMPANY_ID: 'company_id',
            NAME: 'name',
            COUNTRY: 'country',
            STATE: 'state',
            CITY: 'city',
            STREET: 'street',
            PAVILION: 'pavilion',
            BUILDING: 'building',
            FLOOR: 'floor',
        },
    },
};
