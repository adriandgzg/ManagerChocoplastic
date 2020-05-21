
export default {
    methods: {
        usercan(permissionName) {
            return Permissions.indexOf(permissionName) !== -1;
        },
    },
};