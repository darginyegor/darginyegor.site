'use strict';

document.addEventListener('DOMContentLoaded', function () {
	smoothScrollForAnchors();
	initTags();
	initSelects();

	// Input errors remover
	document.querySelectorAll('input').forEach(function (each) {
		each.addEventListener('focus', function (event) {
			const controlContainer = event.target.closest('.ds-input');
			controlContainer.classList.remove('ds-input--complete');
		})
	})

	// Form submitter
	document.querySelector('.ds-button--submit').addEventListener('click', function (event) {
		event.preventDefault();
		const form = document.forms['request-form'];
		const formControls = form.elements;
		var formValid = true;
		var requestBody = {};
		for (var control of formControls) {
			if (!control.name) continue;
			var controlContainer = control.closest('.ds-input');
			controlContainer.classList.remove('ds-input--invalid');
			if (control.value) {
				requestBody[control.name] = control.value;
				controlContainer.classList.add('ds-input--complete');
			} else {
				controlContainer.classList.add('ds-input--invalid');
				setTimeout(function (element) {
					return element.classList.remove('ds-input--invalid');
				}, 1000, controlContainer);
				formValid = false;
			}
		}
		if (!formValid) return;
		form.classList.add('ds-form--disabled');
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'https://formspree.io/darginyegor.design@gmail.com');
		xhr.send(JSON.stringify(requestBody));
		xhr.addEventListener('readystatechange', function (event) {
			if (this.readyState == 4) {
				const error = (this.status != 200);
				const resultClassModifier = error ? 'error' : 'success';
				const formResult = document.querySelector('.ds-form-result--' + resultClassModifier);
				formResult.classList.add('ds-form-result--visible');
			}
		});
	});
});

function smoothScrollForAnchors() {
	document.querySelectorAll('[href*="#"]').forEach(function (each) {
		each.addEventListener('click', function (event) {
			event.preventDefault();
			const elementID = each.getAttribute("href").substr(1);
			document.getElementById(elementID).scrollIntoView({ behavior: 'smooth', block: 'start', inline: "nearest" });
		});
	});
}

function initSelects() {
	// Open
	document.querySelectorAll('.ds-select__input').forEach(function (each) {
		each.addEventListener('click', function (event) {
			const selectContainer = each.parentElement;
			selectContainer.querySelector('.ds-select__dropdown').classList.add('ds-select__dropdown--open');
			selectContainer.classList.remove('ds-input--complete');
		});
	});
	// Close
	document.querySelectorAll('.ds-select__dropdown-item').forEach(function (each) {
		each.addEventListener('click', function (event) {
			var dropdownElement = each.parentElement;
			var dropdownItems = dropdownElement.children;
			for (var item of dropdownItems) {
				item.classList.remove('ds-select__dropdown-item--selected');
			}
			each.classList.add('ds-select__dropdown-item--selected');
			dropdownElement.classList.remove('ds-select__dropdown--open');
			dropdownElement.parentElement.querySelector('.ds-select__input').innerText = each.innerText;
			dropdownElement.parentElement.querySelector('input').value = each.innerText;
			dropdownElement.parentElement.classList.remove('ds-input--invalid');
		});
	});
}

function initTags() {
	document.querySelectorAll('.ds-portfolio-item__tag').forEach(function (each) {
		each.addEventListener('click', function (event) {
			event.preventDefault();
			alert('Triggered ' + event.target.innerText + ' tag filter.');
		})
	});
}