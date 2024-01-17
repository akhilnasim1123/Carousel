const initSlider = ()=>{
    const imageList = document.querySelector(".image-list");
    const slideButtons = document.querySelectorAll(".slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth= imageList.clientWidth


    scrollbarThumb.addEventListener("mousedown",(e) => {
        const starX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e)=>{
            const deltax = e.clientX - starX;
            const newThumbPosition = thumbPosition + deltax;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
            const boundedPosition = Math.max(0,Math.min(maxThumbPosition,newThumbPosition))
            const scrollPostition =(boundedPosition/maxThumbPosition) * maxScrollLeft;
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPostition;
          
            
        }
        const handleMouseUP = () =>{
            document.removeEventListener("mousemove",handleMouseMove);
            document.removeEventListener("mouseup",handleMouseUP);
        }
        document.addEventListener("mousemove",handleMouseMove);
        document.addEventListener("mouseup",handleMouseUP);
    });


    slideButtons.forEach(button=>{
        button.addEventListener('click',()=>{
            const direction = button.id === "prev" ? -1 : 1;
            console.log(imageList.clientWidth)
            const scrollAmount= imageList.clientWidth * direction;
            console.log(scrollAmount)
            imageList.scrollBy({left:scrollAmount,behavior:"smooth"});

        })
    });
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none":"block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none":"block";
    }
    const updateScrollThumbPosition = () => {
        const scrollPostition = imageList.scrollLeft
        const thumbPosition = (scrollPostition/maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left=`${thumbPosition}px`;
    }
    imageList.addEventListener("scroll",()=>{
        handleSlideButtons();
        updateScrollThumbPosition();
    })
}

window.addEventListener("load",initSlider);
