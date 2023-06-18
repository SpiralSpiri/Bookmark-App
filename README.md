# Bookmark App
A pure Vanilla JS app created in javascript to store, create & edit bookmarks.

## Project Description

Develop a JS WebApp that can maintain a list of Bookmarks (Links). The App must contain the following:

1. Form to create new bookmarks
2. Each bookmark must contain a Name & URL
3. Validations must exist to confirm a Bookmarks Name & URL are present
4. Max of 20 bookmarks can be shown at a time
5. More than 20 bookmarks must contain pagination including forward and backwards controls.
6. On confirmation a results page must fire to confirm the users submission
7. Confirmation page must contain the users submission & a link back to the overview page.
8. All bookmarks must persist page reload.
9. A user can create new, edit or delete existing bookmarks

<br>

## Table of Contents
1. Recommendation
2. Design 
3. Validation
4. Future Improvements
5. Pre-Populate Data

<br>

## Recommendation

Attached in this folder are two Build options:

**1. Option 1:** - Confirmation Page

This contains a separate Confirmation Page. After form submission, if the validation has passed it takes the user to another URL to display their confirmation of the new bookmark with the new bookmarks name and URL on display.

**2. Option 2:** - Confirmation Pop-up

 This keeps the user on the same page, however after form submission  it displays a pop-up at the bottom of the page to confirm that the new bookmark has been created.

**Recommendation**

My recommendation is Option 2.

I understand that the requested flow on the brief required a overview page & results page.

However after building this option, I felt that it was unnecessary and a better user experience was to keep the user on the same URL and provide them with instant confirmation. Removing the need for an extra step in the overall user journey.

<br>

## Design

When styling this app, its important to note that I had 2 core focal points:

**1. Function over form**

This primarily focused on strong validation to prevent as much user error as possible. For example: if a user entered an incorrect URL the validation would appear before the user clicks submit.
Or, if the user clicks submit with empty values the error alerts appear to notify the user of the issue and direct them to resolve, until the issue is resolved the submit CTA is disabled.

**2. Responsive mobile design first**

 Building the app mobile first with focusing on making sure that its responsive to greater and smaller screen-devices.


The lowest supported screen-width is 280px

Styling options were inspired using the existing stylings of easyjets Website. Using colour schemes and typography consistent with EasyJets branding. 

The bookmark grid layout is displayed in a basic list allowing for simple scrolling of the Webapp to locate existing bookmarks. 
Each bookmark contains: 
- The user-defined Bookmark Name in a hyperlink to the bookmark URL. 
- Favicon icon of the inputted website pulled from Googles favicon API.
- Clear user controls for each bookmark to edit and delete. 
Delete cta primarily using the colour Red to indicate danger / destructive nature to provide a clear transparency to the user to indicate the removal of existing bookmarks.

The bookmark form layout was inspired from the easyJet Check in / login form, following a similar design in input values & validation / error-messaging.

<br>

## Validation

As mentioned earlier one of my primary focuses was: **Function over form**. 

My interpretation of this was to limit as much user error as possible to create a seamless end-to-end experience.

**Booking Form** - Validation setup
1. A user must enter a name of the booking form
- If there is no name on submit the alert message will fire
<br>

2. A user must enter a url that contains **WWW.**, there is no requirement for the URL to contain **HTTPS://**
- If there is no url on submit the alert message will fire
<br>

3. If a user empties either the Name or URL, the alert message will fire.
- This will fire for the individual input or both accordingly.
<br>

4. If an alert message fires the submit CTA will be disabled.
- The submit CTA is only enabled if the user has a name & valid URL in both inputs.
<br>

5. If a user selects to edit a form on submit of reset CTA, any changes will revert to the existing bookmark vs user changes.

<br>

## Future Improvements

Future Improvements I would like to make would be:

1. Search Bar - navigating bookmarks
   
- To include a search bar for easy navigation of the bookmark List 
<br>

2. Filter button - re-organise bookmarks
   
- Option to filter the bookmarks by recently added or alphabetically by name.
<br>


3. Remove duplicate bookmark names (optional)
   
- Considered the possibility to only have one name per bookmark within the validation. I decided against it as its up to the user discretion if they want to have multiple bookmarks with the same name. But an option to consider based either on user feedback or further testing.
<br>


4. Folder structure - Management of bookmarks
   
 - Ability to create Folders to store and manage bookmarks, similar to google drive / one drive
<br>

5. Drag and Drop - Bookmark gridlist
   
- Following Improvement 4, Ability to move bookmarks either into new folders (similar to google drive / one drive) or into a custom user defined order.

<br>

## Pre-populate Data

Attached in this repo is a list of urls.

[List of URLS.JS](https://github.com/SpiralSpiri/Bookmark-App/blob/main/List%20of%20URLS%20to%20pre-populate.js) code can be used in a web browser of the app to replace & pre-populate the bookmark app with 35 Bookmarks.

AFter the code has been added please refresh and continue using / testing the app.

<br>
<br>
<br>

