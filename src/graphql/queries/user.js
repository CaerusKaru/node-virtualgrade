import { Term } from '../models/Term';
import { Course } from '../models/Course';
import {Student} from '../models/Student';
import {Department} from '../models/Department';
import {ldapSearch} from '../utils/ldap';

function resolveGrading (group) {
  return Course
    .forge()
    .where('grading_group', group)
    .fetchAll({withRelated: ['term', 'assignments.type']});
}

function resolveAdmin (group) {
  return Course
    .forge()
    .where('admin_group', group)
    .fetchAll({withRelated: ['term', 'assignments.type']});
}

function resolveInstr (group) {
  return Course
    .forge()
    .where('instr_group', group)
    .fetchAll({withRelated: ['term', 'assignments.type']});
}

function resolveManage(group) {
  return Department
    .forge()
    .where('manage_group', group)
    .fetchAll({withRelated: ['courses.term', 'courses.assignments.type']})
}

function resolveCourses (username) {
  return Student
    .forge()
    .where('username', username)
    .fetchAll({withRelated: ['course.term', 'course.assignments.type']});
}

function getUser (obj, args, context, info) {
  return Term.forge().where('current', true).fetch({columns: 'term'})
    .then(function (terms) {
      return terms.toJSON();
    }).then(function ({term}) {
      const container = {term};
      return ldapSearch(context.username)
        .then(function ({username, groups}) {
          container.username = username;
          container.groups = groups;
          return Promise.all(container.groups.map(resolveGrading));
        })
        .then(function (courses) {
          container.grading = courses
            .reduce((a, c) => c ? a.concat(c.toJSON()) : [], [])
            .filter(c => c.term.term === container.term);
          return Promise.all(container.groups.map(resolveAdmin));
        })
        .then(function (courses) {
          container.admin = courses
            .reduce((a, c) => c ? a.concat(c.toJSON()) : [], [])
            .filter(c => c.term.term === container.term);
          return Promise.all(container.groups.map(resolveInstr));
        })
        .then(function (courses) {
          container.instr = courses.reduce((a, c) => a.concat(c.toJSON()), []);
          return Promise.all(container.groups.map(resolveManage));
        })
        .then(function (courses) {
          container.manage = {
            departments: courses.reduce((a, c) => a.concat(c.toJSON()), [])
          };
          return resolveCourses(container.username);
        })
        .then(function (courses) {
          container.courses = courses.reduce((a, c) => a.concat(c.toJSON().course), []);
          return container;
        });
    });
}

module.exports = {
  getUser
};