// 1. هيكلة بيانات الطالب (Class & Constructor)
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;           // مصفوفة تحتوي على 3 درجات
    this.attendance = attendance;   // نسبة الحضور
  }

  // 2. دوال التحليل الأكاديمي (Methods)

  // دالة حساب المتوسط باستخدام reduce
  calculateAverage() {
    const total = this.grades.reduce((acc, curr) => acc + curr, 0);
    return total / this.grades.length;
  }

  // دالة التقدير بالحروف بناءً على المتوسط
  getGradeLetter() {
    const avg = this.calculateAverage();
    if (avg >= 90) return 'A';
    if (avg >= 80) return 'B';
    if (avg >= 70) return 'C';
    if (avg >= 60) return 'D';
    if (avg >= 50) return 'E';
    return 'F';
  }

  // دالة النتيجة النهائية (تتحقق من شرطين: المتوسط >= 50 والحضور >= 75)
  getFinalStatus() {
    const avg = this.calculateAverage();
    if (avg >= 50 && this.attendance >= 75) {
      return 'ناجح';
    } else {
      return 'يحتاج مراجعة';
    }
  }
}

// 3. نظام تشغيل الجامعة (Objects Array)
const studentsList = [
  new Student(101, 'أحمد علي', [85, 90, 88], 90),
  new Student(102, 'مريم عبد الحكيم', [42, 45, 48], 80), // متعثرة (المتوسط ~45)
  new Student(103, 'سارة محمود', [70, 75, 72], 65),     // متوسط جيد ولكن الحضور أقل من 75
  new Student(104, 'نورهان السحلول', [40, 43, 41], 78)  // متعثرة (المتوسط ~41.3)
];

// 4. لجنة الرأفة (Array Methods)

// الاستخراج: استخراج الطلاب الذين متوسطهم بين 40 و 49
const strugglingStudents = studentsList.filter(student => {
  const avg = student.calculateAverage();
  return avg >= 40 && avg <= 49;
});

// المعالجة: إضافة 5 درجات رأفة لمتوسط كل طالب متعثر
const boostedAverages = strugglingStudents.map(student => {
  return student.calculateAverage() + 5;
});

// التحليل: جمع المتوسطات الجديدة باستخدام reduce
const totalBoostedAverage = boostedAverages.reduce((acc, curr) => acc + curr, 0);

// متوسط الرأفة: حساب المتوسط العام مع درع الحماية لمنع القسمة على صفر (Division by zero protection)
const averageAfterGrace = strugglingStudents.length > 0 
  ? totalBoostedAverage / strugglingStudents.length 
  : 0;

// 5. المخرجات (Console Logging)

console.log('--- تقرير الطلاب العام ---');
studentsList.forEach(student => {
  const avg = student.calculateAverage().toFixed(2);
  const grade = student.getGradeLetter();
  const status = student.getFinalStatus();
  console.log(`الاسم: ${student.name} | المتوسط: ${avg} | التقدير: ${grade} | النتيجة: ${status}`);
});

console.log('\n--- الطلاب الذين شملتهم الرأفة (المتوسطات بعد الزيادة) ---');
strugglingStudents.forEach((student, index) => {
  const oldAvg = student.calculateAverage().toFixed(2);
  const newAvg = boostedAverages[index].toFixed(2);
  console.log(`الاسم: ${student.name} | المتوسط القديم: ${oldAvg} -> المتوسط بعد الرأفة: ${newAvg}`);
});

console.log('\n--- المتوسط العام للطلاب المتعثرين بعد التعديل ---');
console.log(`المتوسط العام: ${averageAfterGrace.toFixed(2)}`);