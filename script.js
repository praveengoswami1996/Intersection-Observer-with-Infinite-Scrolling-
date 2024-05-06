/*
    Step 1: Define the Intersection Callback Function: 
    This is the function that will be called whenever the observed element intersects with the target element. Inside this function, you can define what action you want to take when the intersection occurs, such as loading more content, triggering an animation, or updating some data.
*/

function callback(entries, observer) {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        //As soon as the target element is visible once, stop observing it.
        if(entry.isIntersecting) {
            observer.unobserve(entry.target);
        }
    });
}


function callback2(entries, observer) {
    //Get the first thing of the array as we are only observing one thing with lastCardObserver
    const lastCard = entries[0];
    if(!lastCard.isIntersecting) return
    LoadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector('.card:last-child'))
}

/*
    Step 2: Set Options (Optional): 
    You can also specify some options for the Intersection Observer, such as the threshold (a value between 0 and 1 that defines when the intersection callback should be triggered) and the root element (the element relative to which the intersection is calculated).
*/

const options = {
    threshold: 1, // Trigger callback when 50% of the target is visible
    // rootMargin: "-100px"
};

/*
    Step 3: Create an Intersection Observer: 
    First, you need to create an Intersection Observer object. You can do this by calling the IntersectionObserver constructor and passing it a callback function. This function will be called whenever the observed elements intersect with a specified target element.
*/

const observer = new IntersectionObserver(callback, options);

const lastCardObserver = new IntersectionObserver(callback2)

/*
    Step 4: Specify the Target Element: 
    Next, you need to specify the target element that you want to observe. This is the element that you want to check for intersection with other elements. You can select this element using a CSS selector or by directly passing a reference to the element.
*/

const cards = document.querySelectorAll('.card');
const lastCard = document.querySelector('.card:last-child');

/*
    Step 5: Start Observing: 
    Finally, you need to start observing the target element by calling the observe() method on the Intersection Observer object and passing it the target element.
*/

cards.forEach((card) => {
    observer.observe(card)
})

lastCardObserver.observe(lastCard);


const cardContainer = document.querySelector(".card-container")

function LoadNewCards() {
    for(let i = 0; i < 10;  i++) {
        const card = document.createElement("div");
        card.textContent = "New Card";
        card.classList.add("card");
        observer.observe(card);
        cardContainer.append(card);
    }
}
