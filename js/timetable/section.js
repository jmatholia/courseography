/* Section class */
function Section(times, course, id) {
    this.id = id;
    this.courseName = this.id.substring(0, 8);
    this.name = this.id.substring(9, 14);
    this.session = this.id.substring(15, 16);
    this.type = this.name.charAt(0);
    this.course = course;
    this.times = times;
    this.clicked = false;
    this.satisfied = true;
}


// Mouse events
Section.prototype.setMouseEvents = function (li) {
    var tmp = this;
    $(li).mouseout(function () {
             tmp.mouseout();
             //tmp.course.renderUpdate();
         })
         .mouseover(function () {
             tmp.mouseover();
             //tmp.course.renderUpdate();
         })
         .click(function () {
             tmp.onclick();
             tmp.course.renderUpdate();
         });
}


Section.prototype.mouseout = function () {
    $.each(this.times, function (i, time) {
        renderClearHover(time);
    });
    renderClearCourseInformation();
}


Section.prototype.mouseover = function () {
    var tmp = this;
    $.each(this.times, function (i, time) {
        renderAddHover(time, tmp);
    });
    renderDisplayCourseInformation(this.course);
    renderDisplaySectionInformation(this);
}


Section.prototype.onclick = function () {
    $.each(this.times, function (i, time) {
        renderClearHover(time);
    });

    updateSelectedLectures(this);
    var course = this.course;

    course.activateSection(this);
    course.updateSatisfaction();
    course.renderSatisfaction();
    course.renderUpdatedHeader();

    saveCookies(selectedCourses, selectedLectures);
    alertUserOfConflict();
}


Section.prototype.setTime = function (time) {
    console.log(time);
    $(time).html(this.courseName)
           .attr("clicked", "true")
           .attr("type", this.type);
}


Section.prototype.setConflictTime = function (time) {
    var conflicts = $(time).data("conflicts");
    conflicts.push(this);
    renderConflicts(time, conflicts);
}


Section.prototype.removeTimes = function () {
    var tmp = this;
    $.each(this.times, function (i, time) {
        if ($(time).data("conflicts").length > 0) {
            tmp.removeConflict(time);
        } else {
            renderClearTime(time);
        }
    });
}


Section.prototype.removeConflict = function (time) {
    var conflicts = $(time).data("conflicts");
    var index = $.inArray(this, conflicts);

    if (index === -1) {
        $(time).html(conflicts[0].courseName)
               .attr("type", conflicts[0].type);
        conflicts.splice(0, 1);
    } else {
        conflicts.splice(index, 1);
    }

    renderConflicts(time, conflicts);
}


// Rendering
Section.prototype.render = function () {
    var li = document.createElement("li");
    $(li).attr("id", this.id)
         .data("instructor", this.instructor)
         .data("cap", this.cap)
         .data("enrol", this.enrol)
         .data("wait", this.wait)
         .attr("clicked", "" + this.clicked)
         .attr("satisfied", "" + this.satisfied);
    li.appendChild(document.createTextNode(this.name));
    this.setMouseEvents(li);
    return li;
}


Section.prototype.renderUpdate = function () {
    $("#" + this.id).attr("clicked", "" + this.clicked)
                    .attr("satisfied", "" + this.satisfied);
}


// Other constructors
function makeLecture(lecture, course, id, sectionTimes) {
    var section = new Section(sectionTimes, course, id);
    section.instructor = lecture.instructor;
    section.cap = lecture.cap;
    section.enrol = lecture.enrol;
    section.wait = lecture.wait;
    return section;
}


function makeTutorial(tutorial, course, id, sectionTimes) {
    var section = new Section(sectionTimes, course, id);
    section.cap = tutorial[3];
    section.enrol = tutorial[4];
    section.wait = tutorial[5];
    return section;
}