// Get Elements from DOM
const channelsContainer = document.getElementById('channelsContainer');

// Get Handlebars Templates from index.html
const source = document.getElementById('channel-template');
// Compile source to template
let template = Handlebars.compile(source.innerHTML);
// Build template with data
const content = {id: 9, title: 'Happy Stream', status: 'Live'};
const html = template(content);
// Append to the DOM
channelsContainer.innerHTML = html
