module.exports = {
    async users(req, res) {
        let registeredUsers = await req.auth.getAllRegisteredUsers();
        
        res.render('admin/users', { registeredUsers, noLogoShow: true, title: 'Потребители' });
    }
}