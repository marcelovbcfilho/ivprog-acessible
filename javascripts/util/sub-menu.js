const subMenuOptions = document.getElementById("subMenuOptions");
const subMenuOptionsTitle = document.getElementById("subMenuOptionsTitle");
const subMenuOptionsTitleH3 = document.getElementById("subMenuOptionsTitleH3");
const subMenuOptionsBody = document.getElementById("subMenuOptionsBody");
const subMenuOptionsFooter = document.getElementById("subMenuOptionsFooter");

function hideSubMenu() {
    subMenuOptions.style.display = 'none';
}

function showSubMenu() {
    subMenuOptions.style.display = 'inline';
}
// ==> Code for an class observer that is triggered every time a element style is changed <==
// var observer = new MutationObserver(function (mutations) {
//     mutations.forEach(function (mutationRecord) {
//         console.log("style changed!");
//     });
// });
//
// var target = document.getElementById('subMenuOptions');
// observer.observe(target, { attributes: true, attributeFilter: ["style"] });