/*jslint todo: true */
/*global $, console, jQuery*/
/*jslint browser:true */
/*jslint plusplus: true */
"use strict";
var result;
var i;
var contentString = "";
var courseSelect;
var xmlhttp;
var csvSplitNewline;
var splitLine;
var isACourse;
var notYetLogged;
var header;
var sections;
var entry;
var courses;
var searchList;

$(document).ready(function () {
    courseSelect = document.getElementById("course-select");
    searchList = document.getElementById("search-list");
    createTimetableSearch();
    courses = getVeryLargeCourseArray();
    trapScroll();
});

function getVeryLargeCourseArray() {
    var httpResponse;
    var splitArray;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "../../timetable_creator/js/courses.out", false);
    xmlhttp.send();
    httpResponse = xmlhttp.responseText;
    splitArray = httpResponse.split("\n");
    return splitArray;
}

function setupEntry(courseObject) {
    entry = document.createElement("li");
    entry.id = courseObject.name + "-li";
    header = document.createElement("h3");
    header.appendChild(document.createTextNode(courseObject.name));
    courseObject.header = header;
    sections = processSession(courseObject);
    entry.appendChild(header);
    $(sections).css("height", "100%");
    $(sections).css("width", "100%");
    entry.appendChild(sections);
    courseSelect.appendChild(entry);
}

function getCourse(courseCode) {
    $.ajax({
        url: "../../res/courses/" + courseCode,
        dataType: "json",
        async: false,
        success: function (data) {
            result = data;
        }
    });
    console.log(result);
    return result;
}

function addCourseToList(course) {
    var courseObject = getCourse(course);
    courseObject.selectedSession = null;
    courseObject.selected = false;
    setupEntry(courseObject);
}

function removeCourseFromList(course) {
    console.log(course);
    var courseElement = document.getElementById(course + "-li");
    $("#" + course + "-li" + " li[clicked*='true']").each(function() {
        $(this).click();
    });
    courseSelect.removeChild(courseElement);
}