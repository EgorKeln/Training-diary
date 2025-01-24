// Получаем элементы
const sportCalendarButton = document.getElementById('sportCalendar');
const sportTrainingButton = document.getElementById('sportTraining');
const sportStatisticsButton = document.getElementById('sportStatistics');
const sportCalendarInfo = document.getElementById('sportCalendarInfo');
const sportTrainingInfo = document.getElementById('sportTrainingInfo');
const sportStatisticsInfo = document.getElementById('sportStatisticsInfo');
// Получаем элементы для подразделов тренировок
const sportTrainingInfoProgramsButton = document.getElementById('sportTrainingInfoPrograms');
const sportTrainingInfoExercisesButton = document.getElementById('sportTrainingInfoExercises');
const sportTrainingInfoClassesButton = document.getElementById('sportTrainingInfoClasses');
const sportTrainingInfoProgramsInfo = document.getElementById('sportTrainingInfoProgramsInfo');
const sportTrainingInfoExercisesInfo = document.getElementById('sportTrainingInfoExercisesInfo');
const sportTrainingInfoClassesInfo = document.getElementById('sportTrainingInfoClassesInfo');
// Функция для отображения выбранной секции
function showSection(section) {
    sportCalendarInfo.style.display = 'none';
    sportTrainingInfo.style.display = 'none';
    sportStatisticsInfo.style.display = 'none';
    section.style.display = 'block'; // Показываем выбранную секцию
}
// Функция для отображения выбранного подраздела тренировок
function showTrainingSubsection(subsection) {
    sportTrainingInfoProgramsInfo.style.display = 'none';
    sportTrainingInfoExercisesInfo.style.display = 'none';
    sportTrainingInfoClassesInfo.style.display = 'none';
    subsection.style.display = 'block'; // Показываем выбранный подраздел
}
// Обработчики событий для кнопок
sportCalendarButton.onclick = function() {
    showSection(sportCalendarInfo);
};
sportTrainingButton.onclick = function() {
    showSection(sportTrainingInfo);
    showTrainingSubsection(sportTrainingInfoProgramsInfo); // Изначально показываем программы
};
sportStatisticsButton.onclick = function() {
    showSection(sportStatisticsInfo);
};
// Обработчики событий для подразделов тренировок
sportTrainingInfoProgramsButton.onclick = function() {
    showTrainingSubsection(sportTrainingInfoProgramsInfo);
};
sportTrainingInfoExercisesButton.onclick = function() {
    showTrainingSubsection(sportTrainingInfoExercisesInfo);
};
sportTrainingInfoClassesButton.onclick = function() {
    showTrainingSubsection(sportTrainingInfoClassesInfo);
};
// Инициализация, чтобы показать сначала календарь
showSection(sportCalendarInfo);





















































































// Логика для добавления тренировок
const sportCalendarInfoTrainingButtonAdd = document.getElementById('sportCalendarInfoTrainingButtonAdd');
const sportCalendarInfoTrainingList = document.getElementById('sportCalendarInfoTrainingList');

sportCalendarInfoTrainingButtonAdd.onclick = function() {
    const workout = prompt("Введите название тренировки:"); // Получаем название тренировки от пользователя
    if (workout) {
        const workoutItem = document.createElement('div');
        workoutItem.textContent = workout; // Устанавливаем текст элемента
        sportCalendarInfoTrainingList.appendChild(workoutItem); // Добавляем элемент в список
    }
};























































































// Классы 
// Классы 
// Классы
// Классы
// Получаем элементы модального окна и списка классов
const sportTrainingInfoClassesButtonAdd = document.getElementById('sportTrainingInfoClassesButtonAdd');
const sportTrainingInfoClassesList = document.getElementById('sportTrainingInfoClassesList');
const modalAddClass = document.getElementById('sportTrainingInfoClassesModalAdd');
const modalCloseAddClass = document.querySelector('.modalCloseAddClass');
const primaryAddButton = document.getElementById('sportTrainingInfoClassesPrimaryAdd');
const secondaryAddButton = document.getElementById('sportTrainingInfoClassesSecondaryAdd');
const primaryAddModal = document.getElementById('sportTrainingInfoClassesPrimaryAddModal');
const secondaryAddModal = document.getElementById('sportTrainingInfoClassesSecondaryAddModal');
const primaryClassNameInput = document.getElementById('sportTrainingInfoClassesPrimaryAddModalTitle');
const savePrimaryButton = document.getElementById('sportTrainingInfoClassesPrimaryAddModalButtonSave');
const secondaryClassNameInput = document.getElementById('sportTrainingInfoClassesSecondaryAddTitle');
const primaryClassSelector = document.getElementById('sportTrainingInfoClassesPrimaryAddModalSelector');
const saveSecondaryButton = document.getElementById('sportTrainingInfoClassesSecondaryAddModalButtonSave');

let arrayOfClasses = JSON.parse(localStorage.getItem('arrayOfClasses')) || [];

// // Глобальный массив для хранения классов
// let arrayOfClasses = []; 
// // Функция для загрузки классов из localStorage
// function loadClasses() {
//     arrayOfClasses = JSON.parse(localStorage.getItem('arrayOfClasses')) || [];
// }
// // Функция для сохранения классов в localStorage
// function saveClasses() {
//     localStorage.setItem('arrayOfClasses', JSON.stringify(arrayOfClasses));
// }
// // Функция для добавления нового класса
// function addClass(newClass) {
//     arrayOfClasses.push(newClass);
//     saveClasses(); // Обновляем localStorage после изменения
// }
// // Инициализация при загрузке
// loadClasses();


// Функция для обновления списка классов и сохранения в localStorage
function updateClassesList() {
    sportTrainingInfoClassesList.innerHTML = ''; // Очищаем текущий список классов

    const primaryClasses = arrayOfClasses.filter(c => c.type === 'primary');
    const secondaryClasses = arrayOfClasses.filter(c => c.type === 'secondary');

    primaryClasses.forEach(primaryClass => {
        const primaryDiv = document.createElement('div');
        primaryDiv.className = "sportTrainingInfoClassesContentWrap";

        // Упаковываем названия классов в span
        const primaryClassNameSpan = document.createElement('div');
        primaryClassNameSpan.className = "sportTrainingInfoClassesContentH2";
        primaryClassNameSpan.textContent = primaryClass.name;
        // primaryClassNameSpan.textContent = primaryClass.name + ' (Первичный)';
        primaryDiv.appendChild(primaryClassNameSpan);

        // Проверяем и добавляем вторичные классы
        const associatedSecondaryClasses = secondaryClasses.filter(s => s.primaryClass === primaryClass.name);
        if (associatedSecondaryClasses.length > 0) {
            associatedSecondaryClasses.forEach(secondaryClass => {
                const secondarySpan = document.createElement('div');
                secondarySpan.className = "sportTrainingInfoClassesContentWrapSecondaryClass";
                
                const secondarySpanSpan = document.createElement('div');
                secondarySpanSpan.className = "sportTrainingInfoClassesContentWrapSecondaryClassContent";
                secondarySpanSpan.textContent = ' ' + secondaryClass.name;
                // secondarySpanSpan.textContent = ' ' + secondaryClass.name + ' (Вторичный)';
                secondarySpan.appendChild(secondarySpanSpan);
                
                const secondarySpanSpanWrap = document.createElement('div');
                secondarySpanSpanWrap.className = "sportTrainingInfoClassesContentWrapSecondaryClassContentWrapButton";

                // Добавляем кнопку удаления для вторичного класса
                const deleteSecondaryButton = document.createElement('button');
                deleteSecondaryButton.textContent = 'Удалить';
                deleteSecondaryButton.onclick = function() {
                    if (confirm('Вы уверены, что хотите удалить этот вторичный класс?')) {
                        arrayOfClasses = arrayOfClasses.filter(c => c !== secondaryClass);
                        updateClassesList();
                    }
                };
                secondarySpanSpanWrap.appendChild(deleteSecondaryButton); // Добавляем кнопку удаления ко вторичному классу
                secondarySpan.appendChild(secondarySpanSpanWrap); // Добавляем кнопку удаления ко вторичному классу
                primaryDiv.appendChild(secondarySpan); // Добавляем вторичный класс к первичному
            });
        }

        // Добавляем кнопку удаления для первичного класса, если нет вторичных
        if (associatedSecondaryClasses.length === 0) {
            const deletePrimaryButton = document.createElement('button');
            deletePrimaryButton.textContent = 'Удалить';
            deletePrimaryButton.onclick = function() {
                if (confirm('Вы уверены, что хотите удалить этот первичный класс?')) {
                    arrayOfClasses = arrayOfClasses.filter(c => c !== primaryClass);
                    updateClassesList();
                }
            };
            primaryDiv.appendChild(deletePrimaryButton); // Добавляем кнопку удаления к первичному классу
        }

        sportTrainingInfoClassesList.appendChild(primaryDiv); // Добавляем первичный класс в общий список
    });

    localStorage.setItem('arrayOfClasses', JSON.stringify(arrayOfClasses)); // Сохраняем в localStorage
}








// Отображение модального окна
sportTrainingInfoClassesButtonAdd.onclick = function() {
    modalAddClass.style.display = 'block';
};

// Закрытие модального окна
modalCloseAddClass.onclick = function() {
    modalAddClass.style.display = 'none';
    primaryAddModal.style.display = 'none';
    secondaryAddModal.style.display = 'none';
};

// Логика для добавления первичного класса
primaryAddButton.onclick = function() {
    primaryAddModal.style.display = 'block';
    secondaryAddModal.style.display = 'none';
};

// savePrimaryButton.onclick = function() {
//     const className = primaryClassNameInput.value.trim();
//     if (className) {
//         const newClass = { name: className, type: 'primary' };
//         arrayOfClasses.push(newClass);
//         primaryClassNameInput.value = ''; // Очищаем поле ввода
//         updateClassesList();
//         modalAddClass.style.display = 'none'; // Закрываем модальное окно
//     } else {
//         alert("Пожалуйста, введите название первичного класса.");
//     }
// };
savePrimaryButton.onclick = function() {
    const className = primaryClassNameInput.value.trim();
    
    if (className) {
        // Проверяем, существует ли уже класс с таким именем
        const classExists = arrayOfClasses.some(c => c.type === 'primary' && c.name === className);

        if (classExists) {
            alert("Класс с таким названием уже существует. Пожалуйста, выберите другое название.");
        } else {
            const newClass = { name: className, type: 'primary' };
            arrayOfClasses.push(newClass);
            primaryClassNameInput.value = ''; // Очищаем поле ввода
            updateClassesList();
            modalAddClass.style.display = 'none'; // Закрываем модальное окно
        }
    } else {
        alert("Пожалуйста, введите название первичного класса.");
    }
};


// Логика для добавления вторичного класса
secondaryAddButton.onclick = function() {
    primaryAddModal.style.display = 'none';
    secondaryAddModal.style.display = 'block';

    // Сброс селектора первичных классов
    primaryClassSelector.innerHTML = '';
    arrayOfClasses.forEach((classItem) => {
        if (classItem.type === 'primary') {
            const option = document.createElement('option');
            option.value = classItem.name;
            option.textContent = classItem.name;
            primaryClassSelector.appendChild(option); // Добавить опции для выбора
        }
    });
};

saveSecondaryButton.onclick = function() {
    const className = secondaryClassNameInput.value.trim();
    const primaryClassName = primaryClassSelector.value;

    if (className && primaryClassName) {
        const newClass = { name: className, type: 'secondary', primaryClass: primaryClassName };
        arrayOfClasses.push(newClass);
        secondaryClassNameInput.value = ''; // Очищаем поле ввода
        updateClassesList();
        modalAddClass.style.display = 'none'; // Закрываем модальное окно
    } else {
        alert("Пожалуйста, выберите первичный класс и введите название вторичного класса.");
    }
};

// Инициализация списка классов при загрузке
updateClassesList();
// Классы 
// Классы 
// Классы
// Классы

























// Упражнения
// Упражнения
// Упражнения color
// Упражнения
// Логика для добавления упражнений

// const sportTrainingInfoExercisesButtonAdd = document.getElementById('sportTrainingInfoExercisesButtonAdd');
// const sportTrainingInfoExercisesList = document.getElementById('sportTrainingInfoExercisesList');

// sportTrainingInfoExercisesButtonAdd.onclick = function() {
//     const exercise = prompt("Введите название упражнения:");
//     if (exercise) {
//         const exerciseItem = document.createElement('div');
//         exerciseItem.textContent = exercise;
//         sportTrainingInfoExercisesList.appendChild(exerciseItem);
//     }
// };
const sportTrainingInfoExercisesButtonAdd = document.getElementById('sportTrainingInfoExercisesButtonAdd');
const sportTrainingInfoExercisesList = document.getElementById('sportTrainingInfoExercisesList');
const modalAdd = document.getElementById('sportTrainingInfoExercisesModalAdd');
const modalClose = document.querySelector('.modalCloseAddExercises');
const saveButton = document.getElementById('sportTrainingInfoExercisesModalButtonSave');
const primaryClassSelect = document.getElementById('sportTrainingInfoExercisesModalClassPrimary');
const secondaryClassSelect = document.getElementById('sportTrainingInfoExercisesModalClassSecondary');


// Загрузка упражнений из localStorage, если они существуют
let arrayOfExercises = JSON.parse(localStorage.getItem('arrayOfExercises')) || [];
let currentExerciseIndex = null;

// Функция для заполнения списка первичных классов
function populatePrimaryClassSelect() {
    primaryClassSelect.innerHTML = ''; // Очищаем текущие опции

    // Заполняем выпадающий список только первичными классами
    arrayOfClasses.forEach((classItem) => {
        if (classItem.type === "primary") {
            const option = document.createElement('option');
            option.value = classItem.name;
            option.textContent = classItem.name;
            primaryClassSelect.appendChild(option);
        }
    });
}

// Функция для заполнения списка вторичных классов
function populateSecondaryClassSelect(selectedPrimary) {
    secondaryClassSelect.innerHTML = ''; // Очищаем предыдущие опции

    // Заполняем вторичный класс, если выбран первичный
    arrayOfClasses.forEach((classItem) => {
        if (classItem.type === "secondary" && classItem.primaryClass === selectedPrimary) {
            const option = document.createElement('option');
            option.value = classItem.name;
            option.textContent = classItem.name;
            secondaryClassSelect.appendChild(option);
        }
    });
}

// Заполнение первичных классов при загрузке
populatePrimaryClassSelect();

// Обработка изменения первичного класса для заполнения вторичного
primaryClassSelect.onchange = function() {
    const selectedPrimary = primaryClassSelect.value;
    populateSecondaryClassSelect(selectedPrimary);
};

// Открытие модального окна для добавления упражнения
sportTrainingInfoExercisesButtonAdd.onclick = function() {
    modalAdd.style.display = 'block'; // Показываем модальное окно
    primaryClassSelect.selectedIndex = 0; // Сброс до первого значения
    secondaryClassSelect.innerHTML = ''; // Очищаем вторичный класс
    populateSecondaryClassSelect(primaryClassSelect.value); // Заполнение вторичных классов по умолчанию
    clearInputFields(); // Очистка полей ввода
    currentExerciseIndex = null; // Сбрасываем текущий индекс упражнения
};

// Закрытие модального окна
modalClose.onclick = function() {

    modalAdd.style.display = 'none'; // Скрываем модальное окно
};

// Функция для проверки уникальности
function isTitleUnique(title) {
    return arrayOfExercises.every(exercise => exercise.title.toLowerCase() !== title.toLowerCase());
}

// // Сохранение нового упражнения
// saveButton.onclick = function() {
//     const title = document.getElementById('sportTrainingInfoExercisesModalTitle').value;
//     const description = document.getElementById('sportTrainingInfoExercisesModalDescription').value;
//     const primaryClass = primaryClassSelect.value;
//     const secondaryClass = secondaryClassSelect.value;
//     const color = document.getElementById('sportTrainingInfoExercisesModalColor').value; // Цвет в HEX
//     const opacity = document.getElementById('sportTrainingInfoExercisesModalOpacity').value;

//     if (title) {
//         if (!isTitleUnique(title) && currentExerciseIndex === null) {
//             alert("Упражнение с таким названием уже существует! Пожалуйста, выберите уникальное название."); // Уведомление о дубликате
//             return;
//         }

//         const rgbaColor = hexToRgba(color, opacity); // Преобразование цвета HEX в RGBA
//         const exercise = {
//             title,
//             description,
//             primaryClass,
//             secondaryClass,
//             color: rgbaColor // Сохраняем цвет в формате RGBA
//         };

//         if (currentExerciseIndex !== null) {
//             // Если редактируем упражнение, проверяем уникальность только среди остальных
//             const existingExercise = arrayOfExercises[currentExerciseIndex];
//             if (existingExercise.title.toLowerCase() !== title.toLowerCase() && !isTitleUnique(title)) {
//                 alert("Упражнение с таким названием уже существует! Пожалуйста, выберите уникальное название."); // Уведомление о дубликате
//                 return;
//             }
//             arrayOfExercises[currentExerciseIndex] = exercise;
//         } else {
//             // Если добавляем новое упражнение
//             arrayOfExercises.push(exercise);
//         }

//         localStorage.setItem('arrayOfExercises', JSON.stringify(arrayOfExercises)); // Сохранение в localStorage
//         updateExerciseList(); // Обновление списка

//         // Скрытие модального окна после сохранения
//         modalAdd.style.display = 'none';

//         // Очистка полей ввода
//         clearInputFields();
//     } else {
//         alert("Пожалуйста, введите название упражнения."); // Уведомление, если имя не введено
//     }
// };

// Функция для генерации уникального ID длиной 10 символов
function generateUniqueId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}

// Сохранение нового упражнения
saveButton.onclick = function() {
    const title = document.getElementById('sportTrainingInfoExercisesModalTitle').value;
    const description = document.getElementById('sportTrainingInfoExercisesModalDescription').value;
    const primaryClass = primaryClassSelect.value;
    const secondaryClass = secondaryClassSelect.value;
    const color = document.getElementById('sportTrainingInfoExercisesModalColor').value; // Цвет в HEX
    const opacity = document.getElementById('sportTrainingInfoExercisesModalOpacity').value;

    if (title) {
        if (!isTitleUnique(title) && currentExerciseIndex === null) {
            alert("Упражнение с таким названием уже существует! Пожалуйста, выберите уникальное название."); // Уведомление о дубликате
            return;
        }

        const rgbaColor = hexToRgba(color, opacity); // Преобразование цвета HEX в RGBA
        let exercise;

        if (currentExerciseIndex !== null) {
            // Если редактируем упражнение, берем существующий ID
            const existingExercise = arrayOfExercises[currentExerciseIndex];
            if (existingExercise.title.toLowerCase() !== title.toLowerCase() && !isTitleUnique(title)) {
                alert("Упражнение с таким названием уже существует! Пожалуйста, выберите уникальное название."); // Уведомление о дубликате
                return;
            }

            // Создаем объект упражнения, копируя существующий ID
            exercise = {
                id: existingExercise.id, // Сохраняем существующий ID
                title,
                description,
                primaryClass,
                secondaryClass,
                color: rgbaColor // Сохраняем цвет в формате RGBA
            };

            // Обновляем массив упражнений
            arrayOfExercises[currentExerciseIndex] = exercise;
        } else {
            // Если добавляем новое упражнение, генерируем новый ID
            exercise = {
                id: generateUniqueId(), // Присваиваем уникальный ID
                title,
                description,
                primaryClass,
                secondaryClass,
                color: rgbaColor // Сохраняем цвет в формате RGBA
            };
            arrayOfExercises.push(exercise);
        }

        localStorage.setItem('arrayOfExercises', JSON.stringify(arrayOfExercises)); // Сохранение в localStorage
        updateExerciseList(); // Обновление списка

        // Скрытие модального окна после сохранения
        modalAdd.style.display = 'none';

        // Очистка полей ввода
        clearInputFields();
    } else {
        alert("Пожалуйста, введите название упражнения."); // Уведомление, если имя не введено
    }
};










// Функция для обновления списка упражнений в интерфейсе
function updateExerciseList() {
    sportTrainingInfoExercisesList.innerHTML = ''; // Очищаем текущий список
    arrayOfExercises.forEach((exercise, index) => {
        const exerciseItem = document.createElement('div');
        // exerciseItem.className = "exercise-block";
            exerciseItem.style.backgroundColor = exercise.color; // Устанавливаем цвет фона
            exerciseItem.style.opacity = 1; // Устанавливаем непрозрачность
            exerciseItem.style.padding = "10px";
            exerciseItem.style.margin = "10px 0";
            exerciseItem.style.borderRadius = "5px";
            // exerciseItem.style.color = "#000";
            exerciseItem.innerHTML = `
            ${exercise.primaryClass}
            (${exercise.secondaryClass})<p>
            ${exercise.title}<p>
            ${exercise.description}.<p>
            <button onclick="editExercise(${index})">Редактировать</button>
            <button onclick="deleteExercise(${index})">Удалить</button>
        `;
        // ID: ${exercise.id},
        // Цвет: ${exercise.color}
        sportTrainingInfoExercisesList.appendChild(exerciseItem);
    });
}





























// Функция для преобразования цвета HEX в RGBA
function hexToRgba(hex, opacity) {
    hex = hex.replace('#', '');

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Очистка полей ввода
function clearInputFields() {
    document.getElementById('sportTrainingInfoExercisesModalTitle').value = '';
    document.getElementById('sportTrainingInfoExercisesModalDescription').value = '';
    primaryClassSelect.selectedIndex = 0; // Сброс до первого значения
    secondaryClassSelect.innerHTML = ''; // Очищаем вторичный класс
    document.getElementById('sportTrainingInfoExercisesModalColor').value = '#1B72E4'; // Возвращаем к красному по умолчанию
    document.getElementById('sportTrainingInfoExercisesModalOpacity').value = 0.5; // Устанавливаем непрозрачность по умолчанию
}

// Функция для редактирования упражнения
function editExercise(index) {
    currentExerciseIndex = index; // Сохраняем индекс редактируемого упражнения
    const exercise = arrayOfExercises[index]; // Получаем упражнение

    // Заполняем поля данными упражнения
    document.getElementById('sportTrainingInfoExercisesModalTitle').value = exercise.title;
    document.getElementById('sportTrainingInfoExercisesModalDescription').value = exercise.description;
    primaryClassSelect.value = exercise.primaryClass; // Устанавливаем первичный класс
    populateSecondaryClassSelect(exercise.primaryClass); // Заполняем вторичный класс
    secondaryClassSelect.value = exercise.secondaryClass; // Устанавливаем вторичный класс
    document.getElementById('sportTrainingInfoExercisesModalColor').value = rgbaToHex(exercise.color); // Устанавливаем цвет
    // document.getElementById('sportTrainingInfoExercisesModalOpacity').value = exercise.color.split(',')[3].slice(0, -1); // Устанавливаем непрозрачность
    document.getElementById('sportTrainingInfoExercisesModalOpacity').value = parseFloat(exercise.color.slice(-3, -1)); // Извлечение значения opacity

    modalAdd.style.display = 'block'; // Показываем модальное окно
}



// Функция для преобразования цвета из rgba в hex
function rgbaToHex(rgba) {
    const rgbaArray = rgba.match(/\d+/g); // Извлекаем числа из rgba
    const r = parseInt(rgbaArray[0]);
    const g = parseInt(rgbaArray[1]);
    const b = parseInt(rgbaArray[2]);
    return "#" + ("0" + r.toString(16).toUpperCase()).slice(-2) + 
                 ("0" + g.toString(16).toUpperCase()).slice(-2) + 
                 ("0" + b.toString(16).toUpperCase()).slice(-2);
}

// // Функция для редактирования программы
// function editProgram(program) {
//     editingProgram = program; // Установка редактируемой программы
//     document.getElementById('sportTrainingInfoProgramsModalTitle').value = program.title;

//     // Преобразуем цвет из rgba в hex перед установкой
//     const hexColor = rgbaToHex(program.color);
//     document.getElementById('sportTrainingInfoProgramsModalColor').value = hexColor; 
//     

//     selectedExercises = program.exercises.slice(); // Копируем упражнения текущей программы
//     renderSelectedExercises();

//     // Вызов функции отображения доступных упражнений
//     renderAvailableExercises();

//     sportTrainingInfoProgramsModalAdd.style.display = 'block'; // Показываем модальное окно
// }









// Функция для удаления упражнения
function deleteExercise(index) {
    if (confirm("Вы уверены, что хотите удалить это упражнение?")) {
        arrayOfExercises.splice(index, 1); // Удаляем упражнение
        localStorage.setItem('arrayOfExercises', JSON.stringify(arrayOfExercises)); // Сохраняем изменения в localStorage
        updateExerciseList(); // Обновление списка
    }
}

// // Функция для преобразования цвета RGBA в HEX
// function rgbaToHex(rgba) {
//     const rgb = rgba.match(/\d+/g);
//     const hex = (1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2]);
//     return `#${(hex | 0).toString(16).slice(1)}`;
// }

// При загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    populateSecondaryClassSelect(primaryClassSelect.value); // Заполняем вторичный класс (будет пустым до выбора)
    updateExerciseList(); // Обновить список во время загрузки страницы
});



// Логика для добавления упражнений
// Логика для добавления упражнений
// Упражнения
// Упражнения
// Упражнения
// Упражнения


















// Программы FFFFFF
// Программы
// Программы
// Программы
// Логика для добавления программ
// const sportTrainingInfoProgramsButtonAdd = document.getElementById('sportTrainingInfoProgramsButtonAdd');
// const sportTrainingInfoProgramsList = document.getElementById('sportTrainingInfoProgramsList');

// sportTrainingInfoProgramsButtonAdd.onclick = function() {
//     const program = prompt("Введите название программы:");
//     if (program) {
//         const programItem = document.createElement('div');
//         programItem.textContent = program;
//         sportTrainingInfoProgramsList.appendChild(programItem);
//     }
// };
// Логика для добавления программ

// Загружаем массивы из localStorage
// Загружаем массивы из localStorage
// Загружаем массив из localStorage

let arrayOfPrograms = JSON.parse(localStorage.getItem('arrayOfPrograms')) || [];

const sportTrainingInfoProgramsButtonAdd = document.getElementById('sportTrainingInfoProgramsButtonAdd');
const sportTrainingInfoProgramsModalAdd = document.getElementById('sportTrainingInfoProgramsModalAdd');
const sportTrainingInfoProgramsModalAvailableExercisesListAdd = document.getElementById('sportTrainingInfoProgramsModalAvailableExercisesListAdd');
const sportTrainingInfoProgramsModalAvailableExercisesAdd = document.getElementById('sportTrainingInfoProgramsModalAvailableExercisesAdd');
const sportTrainingInfoProgramsModalButtonSave = document.getElementById('sportTrainingInfoProgramsModalButtonSave');
const sportTrainingInfoProgramsList = document.getElementById('sportTrainingInfoProgramsList');
const modalCloseAddPrograms = document.querySelector('.modalCloseAddPrograms');

let selectedExercises = [];
let editingProgram = null; // Хранит программ, которую мы редактируем

// Функция для открытия модального окна
sportTrainingInfoProgramsButtonAdd.onclick = function() {
    clearModalFields(); // Очищаем поля модального окна перед добавлением
    sportTrainingInfoProgramsModalAdd.style.display = 'block';
    renderAvailableExercises();
    selectedExercises = [];
    renderSelectedExercises();
};

// Закрытие модального окна
modalCloseAddPrograms.onclick = function() {
    sportTrainingInfoProgramsModalAdd.style.display = 'none';
};

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    if (event.target === sportTrainingInfoProgramsModalAdd) {
        sportTrainingInfoProgramsModalAdd.style.display = 'none';
    }
};

// // Функция для отображения доступных упражнений
// function renderAvailableExercises() {
//     sportTrainingInfoProgramsModalAvailableExercisesListAdd.innerHTML = '';

//     arrayOfExercises.forEach(exercise => {
//         const exerciseElement = document.createElement('div');
//         exerciseElement.style.backgroundColor = exercise.color;
//         exerciseElement.style.padding = "10px";
//         exerciseElement.style.margin = "5px 0";
//         exerciseElement.style.color = "#000";

//         exerciseElement.innerHTML = `
//             <strong>${exercise.title}</strong><br>
//             Описание: ${exercise.description}<br>
//             Основной класс: ${exercise.primaryClass}<br>
//             Вторичный класс: ${exercise.secondaryClass}<br>
//         `;

//         const addButton = document.createElement('button');
//         addButton.textContent = 'Добавить';
//         addButton.onclick = function() {
//             addExerciseToProgram(exercise);
//         };

//         exerciseElement.appendChild(addButton);
//         sportTrainingInfoProgramsModalAvailableExercisesListAdd.appendChild(exerciseElement);
//     });
// }
// Функция для отображения доступных упражнений
function renderAvailableExercises() {
    sportTrainingInfoProgramsModalAvailableExercisesListAdd.innerHTML = '';

    arrayOfExercises.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.style.backgroundColor = exercise.color;
        exerciseElement.style.padding = "10px";
        exerciseElement.style.margin = "10px 0";
        exerciseElement.style.borderRadius = "5px";
        exerciseElement.style.color = "#000";
        exerciseElement.innerHTML = `
            ${exercise.primaryClass}
            (${exercise.secondaryClass})<p>
            ${exercise.title}<p>
            ${exercise.description}.<p>
        `;

        const addButton = document.createElement('button');
        addButton.textContent = 'Добавить';
        addButton.onclick = function() {
            addExerciseToProgram(exercise); // Используем ссылку на оригинальные данные
        };

        exerciseElement.appendChild(addButton);
        sportTrainingInfoProgramsModalAvailableExercisesListAdd.appendChild(exerciseElement);
    });
}


// // Функция добавления упражнения в программу
// function addExerciseToProgram(exercise) {
//     if (!selectedExercises.some(e => e.title === exercise.title)) {
//         selectedExercises.push(exercise);
//         renderSelectedExercises();
//     }
// }
// Функция добавления упражнения в программу
function addExerciseToProgram(exercise) {
    // Проверяем, что упражнение еще не добавлено по ссылке на объект
    if (!selectedExercises.includes(exercise)) {
        // Добавляем ссылку на оригинал
        selectedExercises.push(exercise);
        renderSelectedExercises(); // Обновляем отображение выбранных упражнений
    }
}


// // Функция для отображения добавленных в программу упражнений
// function renderSelectedExercises() {
//     sportTrainingInfoProgramsModalAvailableExercisesAdd.innerHTML = '';

//     selectedExercises.forEach(exercise => {
//         const exerciseElement = document.createElement('div');
//         exerciseElement.style.backgroundColor = exercise.color;
//         exerciseElement.style.padding = "10px";
//         exerciseElement.style.margin = "5px 0";
//         exerciseElement.style.color = "#000";
        
//         exerciseElement.innerHTML = `
//             <strong>${exercise.title}</strong><br>
//             Описание: ${exercise.description}<br>
//             Основной класс: ${exercise.primaryClass}<br>
//             Вторичный класс: ${exercise.secondaryClass}<br>
//         `;

//         const removeButton = document.createElement('button');
//         removeButton.textContent = 'Удалить';
//         removeButton.onclick = function() {
//             selectedExercises = selectedExercises.filter(e => e.title !== exercise.title);
//             renderSelectedExercises();
//         };

//         exerciseElement.appendChild(removeButton);
//         sportTrainingInfoProgramsModalAvailableExercisesAdd.appendChild(exerciseElement);
//     });
// }
// Функция для отображения добавленных в программу упражнений
function renderSelectedExercises() {
    sportTrainingInfoProgramsModalAvailableExercisesAdd.innerHTML = '';

    selectedExercises.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.style.backgroundColor = exercise.color;
        exerciseElement.style.padding = "10px";
        exerciseElement.style.margin = "10px 0";
        exerciseElement.style.borderRadius = "5px";
        exerciseElement.style.color = "#000";
        
        exerciseElement.innerHTML = `
            ${exercise.primaryClass}
            (${exercise.secondaryClass})<p>
            ${exercise.title}<p>
            ${exercise.description}.<p>
        `;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.onclick = function() {
            // Удаляем упражнение по ссылке на объект
            selectedExercises = selectedExercises.filter(e => e !== exercise);
            renderSelectedExercises(); // Обновляем отображение после удаления
        };

        exerciseElement.appendChild(removeButton);
        sportTrainingInfoProgramsModalAvailableExercisesAdd.appendChild(exerciseElement);
    });
}


// // Функция для сохранения или редактирования программы
// sportTrainingInfoProgramsModalButtonSave.onclick = function() {
//     const programTitle = document.getElementById('sportTrainingInfoProgramsModalTitle').value;
//     const programColor = document.getElementById('sportTrainingInfoProgramsModalColor').value;
//     const programOpacity = parseFloat(document.getElementById('sportTrainingInfoProgramsModalOpacity').value);

//     // Проверка на уникальность названия программы
//     if (arrayOfPrograms.some(program => program.title === programTitle && program !== editingProgram)) {
//         alert("Программа с таким названием уже существует. Пожалуйста, выберите другое название.");
//         return;
//     }

//     const rgbaColor = getRgbaColor(programColor, programOpacity);

//     if (!programTitle) {
//         alert("Введите название программы.");
//         return;
//     }

//     const program = {
//         title: programTitle,
//         color: rgbaColor,
//         exercises: selectedExercises
//     };

//     if (editingProgram) {
//         // Обновление существующей программы
//         const index = arrayOfPrograms.indexOf(editingProgram);
//         arrayOfPrograms[index] = program; // Заменяем старую программу на новую

//         // Перерисовываем список программ
//         sportTrainingInfoProgramsList.innerHTML = ''; // Очищаем старый список
//         loadPrograms(); // Загружаем обновленный список программ
//     } else {
//         // Добавление новой программы
//         arrayOfPrograms.push(program);
//         addProgramToList(program); // Добавляем новую программу в список
//     }

//     localStorage.setItem('arrayOfPrograms', JSON.stringify(arrayOfPrograms));

//     clearModalFields(); // Очищаем поля

//     sportTrainingInfoProgramsModalAdd.style.display = 'none';
//     editingProgram = null; // Сбрасываем редактирование
// };








// Функция для генерации уникального ID длиной 10 символов
function generateUniqueId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}

// Функция для сохранения или редактирования программы
sportTrainingInfoProgramsModalButtonSave.onclick = function() {
    const programTitle = document.getElementById('sportTrainingInfoProgramsModalTitle').value;
    const programColor = document.getElementById('sportTrainingInfoProgramsModalColor').value;
    const programOpacity = parseFloat(document.getElementById('sportTrainingInfoProgramsModalOpacity').value);

    // Проверка на пустое название программы
    if (!programTitle) {
        alert("Введите название программы.");
        return;
    }

    // Проверка на уникальность названия программы (исключая редактируемую)
    if (arrayOfPrograms.some(program => program.title === programTitle && program !== editingProgram)) {
        alert("Программа с таким названием уже существует. Пожалуйста, выберите другое название.");
        return;
    }

    // Получаем RGBA цвет
    const rgbaColor = getRgbaColor(programColor, programOpacity);

    let program;

    if (editingProgram) {
        // Если редактируем программу, берем существующий ID
        const index = arrayOfPrograms.indexOf(editingProgram);
        program = {
            id: editingProgram.id, // Сохраняем существующий ID
            title: programTitle,
            color: rgbaColor,
            exercises: selectedExercises.map(exercise => ({
                id: exercise.id,
                title: exercise.title,
                description: exercise.description,
                primaryClass: exercise.primaryClass,
                secondaryClass: exercise.secondaryClass,
                color: exercise.color // Сохраняем необходимую информацию
            }))
        };
        
        // Обновление существующей программы
        arrayOfPrograms[index] = program; // Заменяем старую программу на новую

        // Перерисовываем список программ
        sportTrainingInfoProgramsList.innerHTML = ''; // Очищаем старый список
        loadPrograms(); // Загружаем обновленный список программ
    } else {
        // Если добавляем новую программу, генерируем новый ID
        program = {
            id: generateUniqueId(), // Присваиваем уникальный ID
            title: programTitle,
            color: rgbaColor,
            exercises: selectedExercises.map(exercise => ({
                id: exercise.id,
                title: exercise.title,
                description: exercise.description,
                primaryClass: exercise.primaryClass,
                secondaryClass: exercise.secondaryClass,
                color: exercise.color // Сохраняем необходимую информацию
            }))
        };

        // Добавление новой программы
        arrayOfPrograms.push(program);
        addProgramToList(program); // Добавляем новую программу в список
    }

    // Сохраняем данные в localStorage
    localStorage.setItem('arrayOfPrograms', JSON.stringify(arrayOfPrograms));

    // Очищаем поля
    clearModalFields(); 
    sportTrainingInfoProgramsModalAdd.style.display = 'none';

    // Сбрасываем редактирование для следующей итерации

    editingProgram = null; 
};










// Функция для получения цвета в формате rgba
function getRgbaColor(hex, opacity) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// // Функция для добавления программы в список отображаемых программ
// function addProgramToList(program) {

//     const programItem = document.createElement('div');
    
//     programItem.textContent = `${program.title}, Цвет: ${program.color}`;
//     programItem.style.backgroundColor = program.color;
//     programItem.style.padding = "10px";
//     programItem.style.margin = "10px 0";
//     programItem.style.borderRadius = "5px";
//     programItem.style.color = "#000";
//     const exercisesList = document.createElement('div');
//     exercisesList.style.marginTop = "10px";
//     program.exercises.forEach(exercise => {
//         const exerciseElement = document.createElement('div');
//         exerciseElement.style.backgroundColor = exercise.color;
//         exerciseElement.style.padding = "5px";
//         exerciseElement.style.marginTop = "5px";
//         exerciseElement.style.borderRadius = "3px";
//         exerciseElement.innerHTML = `
//             <strong>${exercise.title}</strong><br>
//             Описание: ${exercise.description}<br>
//             Основной класс: ${exercise.primaryClass}<br>
//             Вторичный класс: ${exercise.secondaryClass}
//         `;
//         exercisesList.appendChild(exerciseElement);
//     });
//     programItem.appendChild(exercisesList);
//     const editButton = document.createElement('button');
//     editButton.textContent = 'Редактировать';
//     editButton.onclick = function() {
//         editProgram(program); // Функция редактирования программы
//     };
//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = 'Удалить';
//     deleteButton.onclick = function() {
//         if (confirm("Вы уверены, что хотите удалить эту программу?")) {
//             const index = arrayOfPrograms.indexOf(program);
//             if (index > -1) {
//                 arrayOfPrograms.splice(index, 1);
//                 localStorage.setItem('arrayOfPrograms', JSON.stringify(arrayOfPrograms));
//                 sportTrainingInfoProgramsList.removeChild(programItem);
//             }
//         }
//     };
//     programItem.appendChild(editButton);
//     programItem.appendChild(deleteButton);
//     sportTrainingInfoProgramsList.appendChild(programItem);
// }

// Функция для добавления программы в список отображаемых программ
function addProgramToList(program) {
    const programItem = document.createElement('div');
    
    // programItem.textContent = `ID: ${program.id}, ${program.title}, Цвет: ${program.color}`;
    programItem.textContent = `${program.title}`;
    programItem.style.backgroundColor = program.color;
    programItem.style.padding = "10px";
    programItem.style.margin = "10px 0";
    programItem.style.borderRadius = "5px";
    programItem.style.color = "#000";

    const exercisesList = document.createElement('div');
    exercisesList.style.marginTop = "10px";
    updateExercisesDisplay(program, exercisesList); // Функция для отображения упражнений
    programItem.appendChild(exercisesList);

    const editButton = document.createElement('button');
    editButton.textContent = 'Редактировать';
    editButton.onclick = function() {
        editProgram(program); // Функция редактирования программы
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = function() {
        if (confirm("Вы уверены, что хотите удалить эту программу?")) {
            const index = arrayOfPrograms.indexOf(program);
            if (index > -1) {
                arrayOfPrograms.splice(index, 1);
                localStorage.setItem('arrayOfPrograms', JSON.stringify(arrayOfPrograms));
                sportTrainingInfoProgramsList.removeChild(programItem);
            }
        }
    };

    programItem.appendChild(editButton);
    programItem.appendChild(deleteButton);
    sportTrainingInfoProgramsList.appendChild(programItem);

    // Запускаем периодическую проверку каждые 5 секунд
    setInterval(() => {
        checkAndUpdateExercises(program, exercisesList);
    }, 100);
}

// Функция для отображения упражнений
function updateExercisesDisplay(program, exercisesList) {
    exercisesList.innerHTML = ''; // Очищаем старый список
    program.exercises.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.style.backgroundColor = exercise.color;
        exerciseElement.style.padding = "10px";
        exerciseElement.style.margin = "10px 0";
        exerciseElement.style.borderRadius = "5px";
        exerciseElement.style.color = "#000";
        
        exerciseElement.innerHTML = `
            ${exercise.primaryClass}
            (${exercise.secondaryClass})<p>
            ${exercise.title}<p>
            ${exercise.description}.<p>
        `;
        exercisesList.appendChild(exerciseElement);
    });
}

// Функция для проверки и обновления упражнений
function checkAndUpdateExercises(program, exercisesList) {
    const updatedExercises = []; // Новый массив для хранения обновленных упражнений

    program.exercises.forEach(exercise => {
        // Ищем Exercise в arrayOfExercises по id
        const updatedExercise = arrayOfExercises.find(e => e.id === exercise.id);
        if (updatedExercise) {
            // Если упражнение найдено, добавляем его в массив обновленных упражнений
            updatedExercises.push(updatedExercise);
        }
    });

    // Обновляем массив упражнений в программе
    program.exercises = updatedExercises;

    // Обновляем отображение упражнений в интерфейсе
    updateExercisesDisplay(program, exercisesList);
}












// Функция для преобразования цвета из rgba в hex
function rgbaToHex(rgba) {
    const rgbaArray = rgba.match(/\d+/g); // Извлекаем числа из rgba
    const r = parseInt(rgbaArray[0]);
    const g = parseInt(rgbaArray[1]);
    const b = parseInt(rgbaArray[2]);
    return "#" + ("0" + r.toString(16).toUpperCase()).slice(-2) + 
                 ("0" + g.toString(16).toUpperCase()).slice(-2) + 
                 ("0" + b.toString(16).toUpperCase()).slice(-2);
}

// Функция для редактирования программы
function editProgram(program) {
    editingProgram = program; // Установка редактируемой программы
    document.getElementById('sportTrainingInfoProgramsModalTitle').value = program.title;

    // Преобразуем цвет из rgba в hex перед установкой
    const hexColor = rgbaToHex(program.color);
    document.getElementById('sportTrainingInfoProgramsModalColor').value = hexColor; 
    document.getElementById('sportTrainingInfoProgramsModalOpacity').value = parseFloat(program.color.slice(-3, -1)); // Извлечение значения opacity

    selectedExercises = program.exercises.slice(); // Копируем упражнения текущей программы
    renderSelectedExercises();

    // Вызов функции отображения доступных упражнений
    renderAvailableExercises();

    sportTrainingInfoProgramsModalAdd.style.display = 'block'; // Показываем модальное окно
}


// Функция для очистки полей модального окна
function clearModalFields() {
    document.getElementById('sportTrainingInfoProgramsModalTitle').value = '';
    document.getElementById('sportTrainingInfoProgramsModalColor').value = '#FFFFFF';
    document.getElementById('sportTrainingInfoProgramsModalOpacity').value = 0.5;
    selectedExercises = []; // Сброс упражнений
    sportTrainingInfoProgramsModalAvailableExercisesAdd.innerHTML = ''; // Очищаем добавленные упражнения
}

// // Инициализируем список программ при загрузке страницы
// function loadPrograms() {
//     arrayOfPrograms.forEach(program => {
//         addProgramToList(program);
//     });
// }
// Инициализируем список программ при загрузке страницы
function loadPrograms() {
    // Проверяем, что массив программ существует и не пустой
    if (Array.isArray(arrayOfPrograms) && arrayOfPrograms.length > 0) {
        arrayOfPrograms.forEach(program => {
            addProgramToList(program); // Добавляем каждую программу в список
        });
    } else {
        console.log("Нет доступных программ для загрузки."); // Сообщение в случае отсутствия программ
    }
}



// Загружаем программы из localStorage при инициализации
loadPrograms();

// Программы
// Программы
// Программы
// Программы













































// Изначально показываем программы в тренировках
showTrainingSubsection(sportTrainingInfoProgramsInfo);
