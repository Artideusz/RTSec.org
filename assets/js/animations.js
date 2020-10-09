!async function() {
    
    function delay(time) {
        return new Promise((res) => {
            setTimeout(res, time);
        })
    }

    async function animMobile() {

        async function typeSecContent(target) {
            const inv = target.querySelector(".inv")
            const content = inv.textContent
            const greenSpan = target.querySelector(".green")

            target.style.height = target.offsetHeight + "px";
    
            target.removeChild(inv)
    
            for(let i = 0; i < content.length; i++) {
                greenSpan.innerHTML += content[i]
                await delay(20)
            }
        }

        function moveSecContainer(entries, obs) {
            entries.forEach(async (entry) => {
                if(entry.isIntersecting) {
                    obs.unobserve(entry.target);
                    const container = entry.target.querySelector(".secCont");
                    container.classList.add("active")
                    await delay(500);
                    await typeSecContent(container)
                }
            })
        }

        function randomize(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        }

        async function showWord(x,y) {
            let word = words[Math.floor(Math.random() * words.length)];
            if(x + word.length <= cols && word.split().every((_,i) => !isOccupied(x+i,y))) {
                for(let i = 0; i < word.length; i++) {
                    occupiedPositions[x + i][y] = true;
                }

                await delay(randomize(200,500));

                for(let i = 0; i < word.length; i++) {
                    await delay(200);
                    changeChar(x + i, y, word[i], "#F00");
                }

                await delay(randomize(2000,5000));

                for(let i = word.length - 1; i >= 0 ; i--) {
                    await delay(200);
                    occupiedPositions[x + i][y] = false;
                    setRandomChar(x + i, y);
                }
            }
        }

        async function chanceForWord() {
            if(randomize(0,10) == 5) {
                await showWord(randomize(0,cols),randomize(0,rows));
            }
        }

        function randomChar() {
            return symbols[Math.floor(Math.random() * symbols.length)]
        }

        async function setRandomChar(i, j) {
            if(!isOccupied(i,j)) {
                await changeChar(i,j,randomChar());
            }
        }

        async function changeChar(x, y, char, color="#0F0") {
            ctx.fillStyle = `#000`;
            ctx.fillRect(x*FONTSIZE,y*FONTSIZE-FONTSIZE+3,FONTSIZE,FONTSIZE);
            ctx.fillStyle = color;
            ctx.fillText(char,x*FONTSIZE,y*FONTSIZE);
        }


        function isOccupied(x,y) {
            return occupiedPositions[x][y] === true;
        }

        /* START THE ANIMATION! */

        const words = ["MASTER", "CRYPTOGRAPHY", "SQLI", "CONQUER", "DARKWEB", "KALI", "PWN", "NETWORKING", "XSS", "LEARN", "RTSEC", "PROTECT", "HACK", "INSPIRE"];
        const symbols = ["1","0","$", "[", "]", "%", ".", "*", "(",")", ";",":", "<",">","?", "-","\\","/","!","_","&","@"];

        const observer = new IntersectionObserver(moveSecContainer, {
            threshold: 0.6
        })
    
        document.querySelectorAll(".sec").forEach(el => {
            observer.observe(el);
        })

        const FONTSIZE = 16;

        let c = document.querySelector("#c");
        let ctx = c.getContext("2d");

        c.width = window.innerWidth;
        c.height = window.innerHeight;

        let cols = Math.floor(c.width/FONTSIZE) + 1;
        let rows = Math.floor(c.height/FONTSIZE) + 1;

        let occupiedPositions = Array(cols).fill(Array(rows).fill(false));

        ctx.font = `${FONTSIZE}px monospace`;
        setInterval(async () => await setRandomChar(randomize(0,cols),randomize(0,rows)), 8);
        setInterval(async () => await chanceForWord(), 200)
    }

    function animDesktop() {
        particlesJS.load("particles-js", "/assets/particles.json"); // Load particles.js
    }

    window.innerWidth <= 768 ? animMobile() : animDesktop()
}()