function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}
window.onbeforeunload = function() {
    return "Are you sure you want to leave this page?";
};
