import { TeacherPortalConstants } from "./constants"; 
const { tableHeaders: { studentId, studentName, subjectName, marks, class: classHeader, section } } = TeacherPortalConstants?.marksOverview;
const marksTableColumns = [
    {
        title: studentId,
        dataIndex: 'studentId',
        key: 'studentId',
    },
    {
        title: studentName,
        dataIndex: 'studentName',
        key: 'studentName',
    },
    {
        title: subjectName,
        dataIndex: 'subjectName',
        key: 'address',
    },
    {
        title: marks,
        dataIndex: 'marks',
        key: 'marks',
    },
    {
        title: classHeader,
        dataIndex: 'class',
        key: 'class',
    },
    {
        title: section,
        dataIndex: 'section',
        key: 'section',
    },

];

export { marksTableColumns }
