module.exports.dateFormatter = cdate => {
    let date = new Date(cdate);
    let month = date .getMonth() + 1;
    let day = date .getDate();
    let year = date .getFullYear();
    return month + "/" + day + "/" + year;
}