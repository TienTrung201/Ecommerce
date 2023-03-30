// ============= User interface =============
export const categoriesSelector = (state) => state.categories.categories;
export const optionsSelector = (state) => state.options.options;
export const userSelector = (state) => state.user;
// ============= Admin interface =============
export const notificationsSelector = (state) => {
    return state.notifications;
};

export const adminUserSelector = (state) => {
    let adminUser = {
        uid: '',
        avatar: null,
        birthDate: null,
        createdAt: null,
        email: '',
        fullName: '',
        gender: null,
        password: '',
        phoneNumber: null,
        userName: '',
    };
    adminUser = state.adminUser;
    return adminUser;
};
