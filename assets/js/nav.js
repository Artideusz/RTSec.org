!function() {
    function typingLogo() {
        let x = document.querySelector(".alogo");
        if(x.innerHTML.endsWith("_")) {
            x.innerHTML = x.innerHTML.slice(0,-1);
        } else {
            x.innerHTML = x.innerHTML + "_";
        }
    }
    
    setInterval(typingLogo, 800);
}()