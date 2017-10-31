import { Term } from '../models/Term';
import { Course } from '../models/Course';
import {Student} from '../models/Student';
import {Department} from '../models/Department';
import {ldapSearch} from '../../utils/ldap';

function resolveGrading (group) {
  // no reason for the difference in this particular method,
  // just exposes new ways of writing the same thing ffr
  return new Course()
    .where('grading_group', group)
    .fetchAll({withRelated: ['term', 'assignments.type']});
}

function resolveAdmin (group) {
  return Course
    .where<Course>('admin_group', group)
    .fetchAll({withRelated: ['term', 'assignments.type']});
}

function resolveInstr (group) {
  return Course
    .where<Course>('instr_group', group)
    .fetchAll({withRelated: ['term', 'assignments.type']});
}

function resolveManage(group) {
  return Department
    .where<Department>('manage_group', group)
    .fetchAll({withRelated: ['courses.term', 'courses.assignments.type']})
}

function resolveCourses (username) {
  return Student
    .where<Student>('username', username)
    .fetchAll({withRelated: ['course.term', 'course.assignments.type']});
}

interface User {
  username: string;
  groups: string[];
  term: Term;
  grading: Course[];
  admin: Course[];
  instr: Course[];
  manage: {
    departments: Course[]
  };
  courses: Course[];
}

export function getUser (obj, args, context, info) {
  return Term.where<Term>('current', true).fetch({columns: 'term'})
    .then(function (terms) {
      return terms.toJSON();
    }).then(function ({term}) {
      let container: User = {
        username: '',
        groups: [],
        term: null,
        grading: [],
        admin: [],
        instr: [],
        manage: {
          departments: []
        },
        courses: []
      };
      container.term = term;
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
