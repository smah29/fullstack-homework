/** Exercise 03 - Form **/

let form = document.querySelector('form');
const NO_FEEDBACK = 'No feedback was submitted.';
const NOT_SUBSCRIBED = 'No, thank you.';
const SUBSCRIBED = 'Yes, I would like to join the newsletter.';

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    let message = form.elements.message.value;
    message = message.length === 0 ? NO_FEEDBACK : message;
    const signup = form.elements.signup.checked ? SUBSCRIBED : NOT_SUBSCRIBED

    console.group('================ Form Submission ==================');
    console.log('Name: ' + name);
    console.log('Email: ' + email);
    console.log('Feedback: ' + message);
    console.log('Newsletter: ' + signup);
    console.groupEnd();

    event.preventDefault();
}
