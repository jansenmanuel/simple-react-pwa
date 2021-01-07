document.addEventListener('DOMContentLoaded', function () {
    window.M = M;
    window.Sidenav = document.querySelector('.side-form');

    var navbar = document.querySelectorAll('.side-nav');
    M.Sidenav.init(navbar);

    var form = document.querySelectorAll('.side-form');
    M.Sidenav.init(form, { edge: 'right' });

    var addBtn = document.querySelectorAll('.add-btn');
    M.FloatingActionButton.init(addBtn);
});