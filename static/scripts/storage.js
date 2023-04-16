function setLocalStorage(key, value){

    if (localStorage.getItem(key) != null){
        localStorage.setItem(key, JSON.stringify(value))
    } else {
        localStorage.removeItem(key)
        localStorage.setItem(key, JSON.stringify(value))
    }
    
}

function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key))
}

function updateRecentActivitiesObj(item){
    setLocalStorage('recentActivitesObj', [item].concat(getLocalStorage('recentActivitesObj')))

    $("#notifications-offcanvas-body").fadeOut(1000, function(){
        $(this).empty().append(
            recentActivites()
        )
    }).fadeIn(1000)
}

//-----------------------------------------------------------------//