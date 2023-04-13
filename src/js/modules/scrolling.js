const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.2;

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let withTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(withTop - progress/speed, withTop + toBlock) : Math.min(withTop + progress/speed, withTop + toBlock));

                document.documentElement.scrollTo(0, r);

                if (r != withTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });

};

export default scrolling;
