// ==============================================================================================================================================================================
// первичные классы green programs
// ==============================================================================================================================================================================

let exercises = JSON.parse(localStorage.getItem('exercises')) || []; // Получение списка упражнений из localStorage или создание пустого массива, если данных нет.
let classes = JSON.parse(localStorage.getItem('classes')) || []; // Получение списка классов из localStorage или создание пустого массива, если данных нет.

// Входной-блок: Работа с кнопками "Упражнения" и "Классы"
const exercisesButton = document.getElementById('exercises'); // Получение элемента кнопки "Упражнения" по ID.
const exercisesModal = document.getElementById('exercisesModal'); // Получение модального окна для упражнений по ID.
const closeExButton = document.getElementsByClassName('closeEx')[0]; // Получение кнопки закрытия модального окна по классу.
const showExercisesButton = document.getElementById('show-exercises'); // Получение кнопки для показа упражнений по ID.
const showClassesButton = document.getElementById('show-classes'); // Получение кнопки для показа классов по ID.
const exerciseList = document.getElementById('exercise-list'); // Получение элемента списка упражнений по ID.
const classList = document.getElementById('class-list'); // Получение элемента списка классов по ID.
const addExerciseButton = document.getElementById('add-exercise'); // Получение кнопки добавления упражнения по ID.
const addClassButton = document.getElementById('add-class'); // Получение кнопки добавления класса по ID.
const exerciseUl = document.getElementById('exercise-ul'); // Получение элемента ненумерованного списка для упражнений по ID.
// const classUl = document.getElementById('class-ul'); // Получение элемента ненумерованного списка для классов по ID (закомментировано).
const classContainer = document.getElementById('class-ul'); // Получение контейнера для списка классов по ID.

// Открытие модального окна
exercisesButton.onclick = function() { // Обработчик клика для кнопки "Упражнения".
    sportCalendarModal.style.display = "none";
    modal1.style.display = 'none'; // Прячем модальное окно
    exercisesModal.style.display = 'block'; // Открытие модального окна для упражнений.      
}

// Закрытие модального окна
closeExButton.onclick = function() { // Обработчик клика для кнопки закрытия окна.
    exercisesModal.style.display = 'none'; // Закрытие модального окна для упражнений.
}

// Переключение между упражнениями и классами
showExercisesButton.onclick = function() { // Обработчик клика для кнопки "Показать упражнения".
    exerciseList.style.display = 'block'; // Показать список упражнений.
    classList.style.display = 'none'; // Скрыть список классов.
    updateExerciseList(); // Обновление списка упражнений.
};

showClassesButton.onclick = function() { // Обработчик клика для кнопки "Показать классы".
    exerciseList.style.display = 'none'; // Скрыть список упражнений.
    classList.style.display = 'block'; // Показать список классов.
    updateClassList(); // Обновление списка классов.
};

// Добавление упражнения
addExerciseButton.onclick = function() { // Обработчик клика для кнопки добавления упражнения.
    addExerciseModal.style.display = 'block'; // Открытие модального окна для добавления упражнения.
}
// Добавление класса
addClassButton.onclick = function() { // Обработчик клика для кнопки добавления класса.
    addClassModal.style.display = 'block'; // Открытие модального окна для добавления класса.
}

// ------ Добавление Упражнений ------
const addExerciseModal = document.getElementById('addExerciseModal'); // Получение элемента модального окна по его ID.
const closeAddExButton = document.getElementsByClassName('closeAddEx')[0]; // Получение кнопки закрытия окна по классу.
const saveExerciseButton = document.getElementById('save-exercise'); // Получение кнопки сохранения упражнения по ее ID.
const exerciseTitleInput = document.getElementById('exercise-title'); // Получение поля ввода заголовка упражнения по его ID.
const exerciseDescriptionInput = document.getElementById('exercise-description'); // Получение поля ввода описания упражнения по его ID.
const exerciseClass1Select = document.getElementById('exercise-class1'); // Получение выпадающего списка для первичного класса.
const exerciseClass2Select = document.getElementById('exercise-class2'); // Получение выпадающего списка для вторичного класса.
const exerciseColorSelect = document.getElementById('exercise-color'); // Получение выпадающего списка для выбора цвета.

closeAddExButton.onclick = function() { // Назначение функции для кнопки закрытия окна.
    addExerciseModal.style.display = 'none'; // Скрытие модального окна.
}

// Функция для загрузки классов в выпадающие списки
function loadClassesToSelects() {
    let classes = JSON.parse(localStorage.getItem('classes')) || []; // Получение классов из localStorage и парсинг их в массив.

    exerciseClass1Select.innerHTML = ''; // Очистка выпадающего списка первичных классов.
    exerciseClass2Select.innerHTML = ''; // Очистка выпадающего списка вторичных классов.

    classes.forEach(classItem => { // Перебор каждого класса из массива classes.
        if (classItem.type === 'primary') { // Проверка, является ли класс первичным.
            const option = document.createElement('option'); // Создание нового элемента option.
            option.value = classItem.title; // Задаем значение опции.
            option.textContent = classItem.title; // Задаем текст метки опции.
            exerciseClass1Select.appendChild(option); // Добавление опции в список первичных классов.
        }
    });

    // exerciseClass2Select.disabled = true; // Отключение вторичного класса до выбора первичного.
}

// Функция для обновления вторичного класса в зависимости от выбранного первичного
function updateSecondaryClasses() {
    const selectedPrimaryClass = exerciseClass1Select.value; // Получение выбранного первичного класса.
    let classes = JSON.parse(localStorage.getItem('classes')) || []; // Получение классов из localStorage.

    const secondaryClasses = classes.reduce((acc, classItem) => { // Сбор вторичных классов для выбранного первичного.
        if (classItem.title === selectedPrimaryClass && classItem.children) { // Проверка на совпадение и наличие детей.
            return [...acc, ...classItem.children]; // Добавление детей к аккумулятору.
        }
        return acc; // Возврат аккумулятора, если не совпало.
    }, []);

    exerciseClass2Select.innerHTML = ''; // Очистка списка вторичных классов.

    secondaryClasses.forEach(childClass => { // Перебор каждого вторичного класса.
        const option = document.createElement('option'); // Создание нового элемента option.
        option.value = childClass.title; // Задаем значение опции.
        option.textContent = childClass.title; // Задаем текст метки опции.
        exerciseClass2Select.appendChild(option); // Добавление опции во второй выпадающий список.
    });

    exerciseClass2Select.disabled = secondaryClasses.length === 0; // Включение второго класса, если имеются опции.
}

// Функция для сохранения упражнения
saveExerciseButton.onclick = function() { 
    const title = exerciseTitleInput.value.trim(); 
    const description = exerciseDescriptionInput.value.trim(); 
    const class1 = exerciseClass1Select.value; 
    const class2 = exerciseClass2Select.value; 
    const color = exerciseColorSelect.value; 

    // Проверка заполнения всех полей
    if (!title || !description || !class1 || !class2 || !color) { 
        alert('Пожалуйста, заполните все поля упражнения.'); 
        return; 
    }

    const exercises = JSON.parse(localStorage.getItem('exercises')) || []; 
    const editState = JSON.parse(localStorage.getItem('editState')) || { isEditing: false, currentExerciseId: null }; 

    // Проверка уникальности заголовка
    if (editState.isEditing) {
        // Если это существующее упражнение, проверяем изменился ли заголовок
        const existingExercise = exercises.find(ex => ex.id === editState.currentExerciseId);
        if (existingExercise) {
            if (existingExercise.title !== title) { 
                // Заголовок изменился, проверяем на уникальность
                if (exercises.find(ex => ex.title === title)) {
                    alert('Упражнение с таким названием уже существует.'); 
                    return; 
                }
            }
        }
    } else {
        // Если это новое упражнение, проверяем на уникальность заголовка
        if (exercises.find(ex => ex.title === title)) { 
            alert('Упражнение с таким названием уже существует.'); 
            return; 
        }
    }

    // Создание нового объекта упражнения
    const newExercise = { title, description, class1, class2, color };

    if (editState.isEditing) {
        // Обновление существующего упражнения
        const index = exercises.findIndex(ex => ex.id === editState.currentExerciseId);
        if (index !== -1) {
            exercises[index] = { ...exercises[index], ...newExercise }; // Обновляем только измененные поля
        }
    } else {
        // Генерация уникального ID для нового упражнения
        const exerciseId = Date.now();
        exercises.push({ ...newExercise, id: exerciseId }); // Добавление нового упражнения в массив.
    }

    // Сохранение изменений в localStorage
    localStorage.setItem('exercises', JSON.stringify(exercises)); 

    // Очистка полей заголовка, описания и выбора классов.
    exerciseTitleInput.value = '';
    exerciseDescriptionInput.value = '';
    exerciseClass1Select.value = '';
    exerciseClass2Select.value = '';
    exerciseColorSelect.value = '';

    // Закрытие модального окна.
    addExerciseModal.style.display = 'none';
    updateExerciseList(); 

    // Сброс состояния редактирования в localStorage
    localStorage.setItem('editState', JSON.stringify({ isEditing: false, currentExerciseId: null }));
};

// Обновление списка упражнений
function updateExerciseList() {
    const exercises = JSON.parse(localStorage.getItem('exercises')) || []; // Загружаем упражнения из localStorage
    exerciseUl.innerHTML = ''; // Очистка существующего списка упражнений.

    exercises.forEach(ex => { // Перебор каждого упражнения.
        const li = document.createElement('li'); // Создание нового элемента списка.
        li.textContent = `${ex.class1} / ${ex.class2} - ${ex.title}: ${ex.description}`; // Установка текста для элемента списка.
        li.style.backgroundColor = ex.color; // Установка цвета фона элемента списка.

        // Добавить кнопки редактирования и удаления
        const editButton = document.createElement('button'); // Создание кнопки редактирования.
        editButton.textContent = 'Редактировать'; // Назначение текста кнопки.
        editButton.onclick = function() { 
            loadClassesToSelects();
            editExercise(ex); // Вызываем функцию редактирования с выбранным упражнением.
        }; 

        const deleteButton = document.createElement('button'); // Создание кнопки удаления.
        deleteButton.textContent = 'Удалить'; // Назначение текста кнопки.
        deleteButton.onclick = function() { // Назначение функции удаления при нажатии.
            // Запрашиваем подтверждение удаления
            const userConfirmed = confirm("Вы уверены, что хотите удалить это упражнение?");
            
            if (userConfirmed) { // Если пользователь подтвердил действие
                const updatedExercises = exercises.filter(e => e.id !== ex.id); // Фильтрация массива упражнений, удаляя выбранное упражнение.
                localStorage.setItem('exercises', JSON.stringify(updatedExercises)); // Сохранение обновленного массива в localStorage.
                updateExerciseList(); // Обновление списка упражнений.
            }
        };

        li.appendChild(editButton); // Добавление кнопки редактирования в элемент списка.
        li.appendChild(deleteButton); // Добавление кнопки удаления в элемент списка.
        exerciseUl.appendChild(li); // Добавление элемента списка в родительский список упражнений.
    }); 
}

// Редактирование упражнения
function editExercise(exercise) {
    // Заполнение полей данными упражнения
    exerciseTitleInput.value = exercise.title; 
    exerciseDescriptionInput.value = exercise.description; 
    exerciseColorSelect.value = exercise.color; 
    // Установите первичный класс
    exerciseClass1Select.value = exercise.class1; 

    // Обновление вторичных классов в зависимости от выбранного первичного класса
    loadSecondaryClasses(exercise.class1, exercise.class2); // Обновить вторичные классы

    // Открытие модального окна
    addExerciseModal.style.display = 'block'; 

    // Устанавливаем состояние редактирования и сохраняем ID упражнения в localStorage
    const editState = { isEditing: true, currentExerciseId: exercise.id };
    localStorage.setItem('editState', JSON.stringify(editState));
}

// Функция для загрузки вторичных классов
function loadSecondaryClasses(selectedClass1, selectedClass2) {
    // Очистка текущих вторичных классов
    // exerciseClass2Select.innerHTML = '';
    updateSecondaryClasses();

    // Пример: Определение вторичных классов в зависимости от выбранного первичного класса
    const secondaryClasses = {
        class1Option1: ['Secondary 1', 'Secondary 2'],
        class1Option2: ['Secondary 3', 'Secondary 4'],
        class1Option3: ['Secondary 5', 'Secondary 6'],
        class1Option4: ['Secondary 7', 'Secondary 8'],
        class1Option5: ['Secondary 9', 'Secondary 10'],
        // Добавьте другие классы по мере необходимости
    };

    // Проверка существования вторичных классов для выбранного первичного класса
    if (secondaryClasses[selectedClass1]) {
        secondaryClasses[selectedClass1].forEach(className => {
            const option = document.createElement('option');
            option.value = className;  // Установка значения для опции
            option.textContent = className;  // Установка текста для опции
            exerciseClass2Select.appendChild(option);
        });
    }

    // Устанавливаем вторичный класс в селекторе, если он существует
    exerciseClass2Select.value = selectedClass2; // Установка ранее выбранного вторичного класса
}


// Добавление нового упражнения
addExerciseButton.onclick = function() { // Назначение функции для кнопки открытия модального окна.
    loadClassesToSelects(); // Загружаем классы в выпадающие списки.

    // Очищаем поля при открытии модального окна
    exerciseTitleInput.value = ''; // Очистка поля заголовка.
    exerciseDescriptionInput.value = ''; // Очистка поля описания.
    exerciseClass1Select.value = ''; // Очистка выбора первичного класса.
    exerciseClass2Select.value = ''; // Очистка выбора вторичного класса.
    exerciseColorSelect.value = ''; // Очистка выбора цвета.
    
    addExerciseModal.style.display = 'block'; // Показываем модальное окно для добавления/редактирования упражнения.

    // Сброс состояния редактирования в localStorage при открытии модального окна
    localStorage.setItem('editState', JSON.stringify({ isEditing: false, currentExerciseId: null }));
};

// Обработчик для выбора первичного класса
exerciseClass1Select.onchange = updateSecondaryClasses; // Обновляем список вторичных классов при изменении первичного класса.










// ==============================================================================================================================================================================
// вторичные классы
// ==============================================================================================================================================================================

const addClassModal = document.getElementById('addClassModal'); // Получение модального окна для добавления класса по ID.
const closeAddClassButton = document.getElementsByClassName('closeAddClass')[0]; // Получение кнопки закрытия модального окна по классу.

// Получение кнопок для добавления первичных и вторичных классов по ID.
const addPrimaryClassButton = document.getElementById('add-primary-class'); // Кнопка добавления первичного класса.
const addSecondaryClassButton = document.getElementById('add-secondary-class'); // Кнопка добавления вторичного класса.
const addPrimaryModal = document.getElementById('add-primary-modal'); // Модальное окно для добавления первичного класса.
const addSecondaryModal = document.getElementById('add-secondary-modal'); // Модальное окно для добавления вторичного класса.

// Закрытие модального окна добавления класса
closeAddClassButton.onclick = function() { // Обработчик клика для кнопки закрытия окна.
    addClassModal.style.display = 'none'; // Закрытие модального окна для добавления класса.
}

// Добавление первичного класса
addPrimaryClassButton.onclick = function() { // Обработчик клика для кнопки добавления первичного класса.
    addPrimaryModal.style.display = 'block'; // Открытие модального окна для добавления первичного класса.
    addSecondaryModal.style.display = 'none'; // Скрытие модального окна для вторичного класса.
}

// Добавление вторичного класса
addSecondaryClassButton.onclick = function() { // Обработчик клика для кнопки добавления вторичного класса.
    addSecondaryModal.style.display = 'block'; // Открытие модального окна для добавления вторичного класса.
    addPrimaryModal.style.display = 'none'; // Скрытие модального окна для первичного класса.
    updatePrimaryClassSelector(); // Обновить список первичных классов для выбора.
}

// Сохранение первичного класса
document.getElementById('save-primary-class').onclick = function() { // Обработчик клика для кнопки сохранения первичного класса.
    const title = document.getElementById('primary-class-title').value.trim(); // Получение введённого названия первичного класса.
    if (!title) { // Проверка, что название не пустое.
        alert('Введите название первичного класса.'); // Предупреждение, если название пустое.
        return; // Завершение функции.
    }
    if (classes.find(c => c.title === title)) { // Проверка, не существует ли класс с таким же названием.
        alert('Такой первичный класс уже существует.'); // Предупреждение о существующем классе.
        return; // Завершение функции.
    }

    classes.push({ title, type: 'primary', children: [] }); // Добавление нового первичного класса в массив классов.
    localStorage.setItem('classes', JSON.stringify(classes)); // Сохранение массива классов в localStorage.
    document.getElementById('primary-class-title').value = ''; // Очистка поля ввода названия первичного класса.
    addPrimaryModal.style.display = 'none'; // Закрытие модального окна для добавления первичного класса.
    addClassModal.style.display = 'none'; // Закрытие модального окна для добавления класса.
    updateClassList(); // Обновление списка классов на экране.
}

// Сохранение вторичного класса
document.getElementById('save-secondary-class').onclick = function() {
    const title = document.getElementById('secondary-class-title').value.trim(); // Получение введённого названия вторичного класса.
    const primaryClassTitle = document.getElementById('primary-class-selector').value; // Получение выбранного первичного класса.

    if (!title) { // Проверка, что название вторичного класса не пустое.
        alert('Введите название вторичного класса.'); // Предупреждение о пустом названии.
        return; // Завершение функции.
    }
  
    const primaryClass = classes.find(c => c.title === primaryClassTitle); // Поиск выбранного первичного класса в массиве классов.

    if (!primaryClass) { // Проверка, выбран ли первичный класс.
        alert('Выберите первичный класс.'); // Предупреждение о необходимости выбора первичного класса.
        return; // Завершение функции.
    }

    // Проверка на уникальность названия вторичного класса среди всех вторичных классов
    for (const primary of classes) { // Перебираем все первичные классы
        const existingSecondary = primary.children.find(secondary => secondary.title === title);
        if (existingSecondary) { // Если нашли дубликат
            alert(`Такой вторичный класс уже существует в классе "${primary.title}".`); // Указываем первичный класс
            return; // Завершение функции.
        }
    }

    primaryClass.children.push({ title, type: 'secondary' }); // Добавление нового вторичного класса в массив детей выбранного первичного.
    localStorage.setItem('classes', JSON.stringify(classes)); // Сохранение массива классов в localStorage.
    
    document.getElementById('secondary-class-title').value = ''; // Очистка поля ввода названия вторичного класса.
    addSecondaryModal.style.display = 'none'; // Закрытие модального окна для добавления вторичного класса.
    addClassModal.style.display = 'none'; // Закрытие модального окна для добавления класса.
    updateClassList(); // Обновление списка классов на экране.
}

// Обновление списка классов
function updateClassList() { // Функция для обновления отображаемого списка классов.
    classContainer.innerHTML = ''; // Очистка контейнера для классов.

    classes.forEach(c => { // Перебор каждого класса.
        const classDiv = document.createElement('div'); // Создание элемента для класса.
        const classTitle = document.createElement('h2'); // Создание элемента заголовка для названия класса.
        classTitle.textContent = c.title; // Установка текста заголовка на название класса.

        // Кнопка удаления первичного класса
        const deletePrimaryButton = document.createElement('button'); // Создание кнопки для удаления класса.
        deletePrimaryButton.textContent = 'Удалить класс'; // Назначение текста кнопки.
        deletePrimaryButton.onclick = function () { // Обработчик клика для кнопки удаления.
            // Удаление без подтверждения, если дети пустые
            if (c.children.length === 0) { // Проверка, есть ли у класса вторичные классы.
                classes = classes.filter(item => item !== c); // Удаление класса из массива классов.
                localStorage.setItem('classes', JSON.stringify(classes)); // Сохранение обновленного массива в localStorage.
                updateClassList(); // Обновление списка классов на экране.
            } else {
                alert('Вы не можете удалить класс, пока у него есть вторичные классы.'); // Предупреждение о том, что класс не может быть удалён с детьми.
            }
        };

        classDiv.appendChild(classTitle); // Добавление заголовка класса в элемент класса.
        classDiv.appendChild(deletePrimaryButton); // Добавление кнопки удаления в элемент класса.

        // Добавление вторичных классов
        c.children.forEach(child => { // Перебор каждого вторичного класса.
            const childSpan = document.createElement('span'); // Создание элемента для представления вторичного класса.
            childSpan.textContent = child.title; // Установка текста элемента на название вторичного класса.
            childSpan.style.marginRight = '10px'; // Добавление правого отступа для оформления.
            childSpan.style.color = 'blue'; // Установка цвета текста вторичного класса на синий.
            // Здесь может понадобиться добавление childSpan в родительский элемент для отображения.
        
        // Кнопка удаления вторичного класса с подтверждением
        const deleteSecondaryButton = document.createElement('button'); // Создание кнопки для удаления вторичного класса.
        deleteSecondaryButton.textContent = 'Удалить'; // Назначение текста кнопки удаления.
        deleteSecondaryButton.onclick = function () { // Обработчик клика для кнопки удаления.
            // Подтверждение удаления с сообщением о названии вторичного класса
            if (confirm(`Вы уверены, что хотите удалить вторичный класс "${child.title}"?`)) { // Запрос подтверждения на удаление.
                c.children = c.children.filter(item => item !== child); // Удаление вторичного класса из массива детей первичного класса.
                localStorage.setItem('classes', JSON.stringify(classes)); // Сохранение обновленного массива классов в localStorage.
                updateClassList(); // Обновление списка классов на экране.
            }
        };

        childSpan.appendChild(deleteSecondaryButton); // Добавление кнопки удаления вторичного класса в элемент.
        classDiv.appendChild(childSpan); // Добавление элемента с вторичным классом и кнопкой удаления в родительский элемент.
        });

    classContainer.appendChild(classDiv); // Добавление элемента первичного класса в контейнер классов.
    });
}

// Обновление селектора для выбора первичного класса
function updatePrimaryClassSelector() { // Функция для обновления селектора первичных классов.
    const selector = document.getElementById('primary-class-selector'); // Получение элемента селектора по ID.
    selector.innerHTML = ''; // Очистить текущие опции селектора.
    classes.forEach(c => { // Перебор каждого класса.
        if (c.type === 'primary') { // Проверка, является ли класс первичным.
            const option = document.createElement('option'); // Создание нового элемента option для селектора.
            option.value = c.title; // Установка значения option на название первичного класса.
            option.textContent = c.title; // Установка текста option на название первичного класса.
            selector.appendChild(option); // Добавление option в селектор.
        }
    });
}

// При загрузке проверяем существующие данные
document.addEventListener('DOMContentLoaded', () => { // Обработчик события, который срабатывает после загрузки документа.
    exercises = JSON.parse(localStorage.getItem('exercises')) || []; // Получение списка упражнений из localStorage или создание пустого массива.
    classes = JSON.parse(localStorage.getItem('classes')) || []; // Получение списка классов из localStorage или создание пустого массива.
    updateExerciseList(); // Обновление списка упражнений на экране.
    updateClassList(); // Обновление списка классов на экране.
});










// ==============================================================================================================================================================================
// календарь  formattedProgramDate
// ==============================================================================================================================================================================

const sportCalendarButton = document.getElementById('sport-calendar');
const sportCloseButton = document.getElementById('sport-close');
const sportCalendarModal = document.getElementById('sport-calendar-modal');
const sportCurrentDateDiv = document.getElementById('sport-current-date');
const sportAddButton = document.getElementById('sport-add-button');
const sportCalendarModal2 = document.getElementById('sport-calendar-modal2');
const sportCloseButton2 = document.getElementById('sport-close2');
const sportAvailableProgramsDiv = document.getElementById('sport-available-programs');
const sportAddSelectedButton = document.getElementById('sport-add-selected-button');
const sportApproachesDiv = document.getElementById('sport-approaches');
const sportExerciseModal = document.getElementById('sport-exercise-modal');
const sportExerciseTitle = document.getElementById('sport-exercise-title');
const sportExerciseList = document.getElementById('sport-exercise-list');
const sportCloseExerciseButton = document.getElementById('sport-close-exercise');

// Новые переменные для модального окна подхода
const sportApproachModal = document.getElementById('sport-approach-modal');
const sportApproachCloseButton = document.getElementById('sport-close-approach');
const sportApproachTitle = document.getElementById('sport-approach-title');
const sportWeightInput = document.getElementById('sport-weight');
const sportRepetitionsInput = document.getElementById('sport-repetitions');
const sportleadTimeInput = document.getElementById('sport-leadTime');
const sportrestTimeInput = document.getElementById('sport-restTime');
const sportAnote = document.getElementById('sport-Anote');

const sportSaveApproachButton = document.getElementById('sport-save-approach');
const sportApproachStatisticsDiv = document.getElementById('sport-approach-statistics');

let sportAddedPrograms = []; // Массив для хранения добавленных программ
let sportSelectedPrograms = []; // Массив для хранения выбранных программ
let currentExercise = ''; // Переменная для хранения текущего упражнения
let currentProgram = ''; // Переменная для хранения текущей программы
let currentEntryIndex = null; // Индекс редактируемого подхода

// Загрузка добавленных программ из localStorage при загрузке страницы
function loadAddedPrograms() {
    const storedPrograms = JSON.parse(localStorage.getItem('addedPrograms')) || [];
    sportAddedPrograms = storedPrograms; // Обновляем массив добавленных программ
    renderAddedPrograms(); // Отображаем добавленные программы
}

// // Функция для отображения добавленных программ
// function renderAddedPrograms() {
//     // Получаем данные из localStorage для workouts
//     const workouts = JSON.parse(localStorage.getItem('workouts')) || [];

//     // Очищаем предыдущие программы
//     sportApproachesDiv.innerHTML = ''; 
//     console.log
//     // Основная логика отображения добавленных программ

//     sportAddedPrograms.forEach((program) => {
//         const sportDiv = document.createElement('div');

//         // Устанавливаем цвет фона для контейнера программы
//         sportDiv.style.backgroundColor = program.color || 'transparent'; // Используем color программы
//         sportDiv.style.padding = '10px';
//         sportDiv.style.marginBottom = '10px'; // Отступ между программами
//         sportDiv.style.borderRadius = '5px'; // Закругленные углы

//         // Форматируем дату добавления
//         const date = new Date(program.date);
//         const formattedDate = date.toLocaleDateString('ru-RU', {
//             day: '2-digit',
//             month: 'long',
//             year: 'numeric'
//         });

//         // Добавляем отображение даты и программы
//         const programColorDisplay = program.color ? program.color : 'Нет цвета';
//         // sportDiv.innerText = `${formattedDate} - ${program.name} (Цвет: ${programColorDisplay})`;
//         sportDiv.innerText = `${formattedDate} - ${program.name}`;

//         // Пытаемся найти соответствующие упражнения в workouts
       
//         const workout = workouts.find(workout => workout.name === program.name);
//         if (workout && workout.exercises && workout.exercises.length > 0) {
//             const exercisesDiv = document.createElement('div');
//             exercisesDiv.style.marginLeft = '20px'; // Добавляем отступ для улучшения восприятия
//             exercisesDiv.style.backgroundColor = program.color || 'transparent'; // Используем color программы
//             exercisesDiv.style.padding = '10px'; // Добавляем отступы
//             exercisesDiv.style.borderRadius = '5px'; // Округляем углы
//             workout.exercises.forEach(exercise => {
//                 const exerciseDiv = document.createElement('div');

//                 // Устанавливаем цвет фона для контейнера упражнений
//                 exerciseDiv.style.backgroundColor = exercise.color || 'transparent'; // Используем color упражнения
//                 exerciseDiv.style.padding = '10px'; 
//                 exerciseDiv.style.marginTop = '5px'; // Отступ между упражнениями
//                 exerciseDiv.style.borderRadius = '5px'; // Закругленные углы

//                 exerciseDiv.innerHTML = `
//                     <strong>Упражнение:</strong> ${exercise.title || 'Не указано'} <br>
//                     <span>Описание: ${exercise.description || 'Нет описания'}</span><br>
//                     <span>Класс 1: ${exercise.class1 || 'Нет данных'}</span><br>
//                     <span>Класс 2: ${exercise.class2 || 'Нет данных'}</span><br>
                    
//                 `;
// {/* <span style="color: ${exercise.color || 'black'};">Цвет: ${exercise.color || 'Нет данных'}</span><br></br> */}
//                 exercisesDiv.appendChild(exerciseDiv); // Добавляем информацию об упражнении в exercisesDiv
//             });

//             sportDiv.appendChild(exercisesDiv); // Добавляем div для упражнений в sportDiv
//         }

//         // Кнопка "Начать"
//         const sportStartButton = document.createElement('button');

//         sportStartButton.innerText = 'Начать';
//         sportStartButton.onclick = () => {
//             openExerciseModal(program.name); // Открываем модальное окно с упражнениями
//         };

//         // Кнопка "Удалить"
//         const sportDeleteButton = document.createElement('button');
//         sportDeleteButton.innerText = 'Удалить';
//         sportDeleteButton.onclick = () => {
//             if (confirm(`Вы действительно хотите удалить ${program.name}?`)) {
//                 deleteProgram(program.name); // Удаляем программу
//             }
//         };

//         sportDiv.appendChild(sportStartButton); // Добавляем кнопку "Начать"
//         sportDiv.appendChild(sportDeleteButton); // Добавляем кнопку "Удалить"
//         sportApproachesDiv.appendChild(sportDiv); // Добавляем программу в основной контейнер
//     });
// }

// // Функция для удаления программы
// function deleteProgram(programName) {
//     sportAddedPrograms = sportAddedPrograms.filter((program) => program.name !== programName); // Убираем программу из массива
//     localStorage.setItem('addedPrograms', JSON.stringify(sportAddedPrograms)); // Сохраняем обновленный массив в localStorage
//     renderAddedPrograms(); // Обновляем отображение добавленных программ
// }

let prevSavedDates = JSON.parse(localStorage.getItem('savedDates')) || [];

// Функция загрузки добавленных программ
function loadAddedPrograms() {
    const storedPrograms = JSON.parse(localStorage.getItem('addedPrograms')) || [];
    sportAddedPrograms = storedPrograms; 
    renderAddedPrograms(); 
}

// Функция обновления отображения добавленных программ
function updatePrograms() {
    const currentSavedDates = JSON.parse(localStorage.getItem('savedDates')) || [];
    
    // Проверяем, изменился ли массив savedDates
    if (JSON.stringify(currentSavedDates) !== JSON.stringify(prevSavedDates)) {
        prevSavedDates = currentSavedDates; // Обновляем предыдущее состояние
        renderAddedPrograms(); // Перерисовываем программы
    }
}

// Запускаем таймер на проверку каждые 1000 мс (1 секунда)
setInterval(updatePrograms, 10);

// Функция отображения добавленных программ
function renderAddedPrograms() {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    sportApproachesDiv.innerHTML = '';

    // Предполагаем, что savedDates хранится в localStorage
    const savedDates = JSON.parse(localStorage.getItem('savedDates')) || [];
    
    // Преобразуем savedDates в Set для более быстрой проверки
    const savedDatesSet = new Set(savedDates);

    sportAddedPrograms.forEach((program) => {
        const formattedProgramDate = new Date(program.date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }); // Форматируем дату программы

        // Проверяем, существует ли эта дата в savedDates
        if (!savedDatesSet.has(formattedProgramDate)) {
            return; // Если дата не совпадает, пропускаем эту программу
        }

        const sportDiv = document.createElement('div');
        sportDiv.className = "WrapProgramAll"; 
        sportDiv.style.backgroundColor = program.color || 'transparent';
        
        sportDiv.innerHTML = `
        <div class="formattedProgramDateNameColorWrapper">
            <div class="formattedProgramDate">${formattedProgramDate}</div>
            <div class="formattedProgramName">${program.name}</div>
            <div class="formattedProgramColor">${program.color || 'Нет цвета'}</div>
        </div>
        `;

        const workout = workouts.find(workout => workout.name === program.name);
        if (workout && workout.exercises && workout.exercises.length > 0) {
            const exercisesDiv = document.createElement('div');
            exercisesDiv.className = "WrapProgram"; 
            exercisesDiv.style.backgroundColor = program.color || 'transparent'; 
            workout.exercises.forEach(exercise => {
                const exerciseDiv = document.createElement('div');
                exerciseDiv.className = "WrapProgramExercise"; 
                exerciseDiv.style.backgroundColor = exercise.color || 'transparent'; 
                exerciseDiv.innerHTML = `
                    <div class="formattedExerciseTitleWrapper">
                        <div class="formattedExerciseTitle">${exercise.title || 'Не указано'}</div>
                    </div>
                    <div class="formattedExerciseClassWrapper">
                        <div class="formattedExerciseClass1">${exercise.class1 || 'Нет данных'}</div>
                        <div class="formattedExerciseClass2">${exercise.class2 || 'Нет данных'}</div>
                        <div class="formattedExerciseColor">${exercise.color || 'Нет данных'}</div>
                    </div>
                    <div class="formattedExerciseDescriptionWrapper">
                        <div class="formattedExerciseDescription">${exercise.description || 'Нет описания'}</div>
                    </div>
                    
                `;
                exercisesDiv.appendChild(exerciseDiv); 
            });
            sportDiv.appendChild(exercisesDiv); 
        }




        // Создаем div для обертки кнопок
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'buttonStartDeletWrapper'; 

        // Создаем первую кнопку - Старт
        const sportStartButton = document.createElement('button');
        sportStartButton.className = "formattedProgramStart";
        sportStartButton.innerHTML = '<img src="./img/play.gif">';
        sportStartButton.onclick = () => {
            openExerciseModal(program.name);
        };

        // Создаем вторую кнопку - Удалить
        const sportDeleteButton = document.createElement('button');
        sportDeleteButton.className = "formattedProgramDelet";
        sportDeleteButton.innerHTML = '<img src="./img/delete.gif">';
        sportDeleteButton.onclick = () => {
            if (confirm(`😲 Вы действительно хотите удалить ${program.name}?`)) {
                deleteProgram(program.name);
            }
        };

        
        buttonWrapper.appendChild(sportStartButton);
        buttonWrapper.appendChild(sportDeleteButton);
        sportDiv.appendChild(buttonWrapper); 





        // const sportStartButton = document.createElement('button');
        // sportStartButton.className = "formattedProgramStart";
        // sportStartButton.innerHTML = `<img src="./img/play.gif">`;
        // sportStartButton.onclick = () => {
        //     openExerciseModal(program.name);
        // };

        // const sportDeleteButton = document.createElement('button');
        // sportDeleteButton.className = "formattedProgramDelet";
        // sportDeleteButton.innerHTML = '<img src="./img/delete.gif">';
        // sportDeleteButton.onclick = () => {
        //     if (confirm(`😲Вы действительно хотите удалить ${program.name}?`)) {
        //         deleteProgram(program.name); 
        //     }
        // };
        
        // sportDiv.appendChild(sportStartButton); 
        // sportDiv.appendChild(sportDeleteButton); 











        sportApproachesDiv.appendChild(sportDiv); 
    });
}

// Функция удаления программы
function deleteProgram(programName) {
    sportAddedPrograms = sportAddedPrograms.filter((program) => program.name !== programName); 
    localStorage.setItem('addedPrograms', JSON.stringify(sportAddedPrograms)); 
    renderAddedPrograms(); 
}

// // Функция удаления программы
// function deleteProgram(programName) {
//     // Получаем массив сохраненных дат из localStorage
//     const savedDates = JSON.parse(localStorage.getItem('savedDates')) || [];
    
//     // Проверяем, есть ли программа с таким именем в добавленных программах
//     const programToDelete = sportAddedPrograms.find(program => program.name === programName);
// console.log(savedDates);
//     // Если программа найдена
//     if (programToDelete) {
//         // Форматируем дату программы для проверки
//         const formattedProgramDate = new Date(programToDelete.date).toLocaleDateString('ru-RU', {
//             day: '2-digit',
//             month: 'long',
//             year: 'numeric',
//             timeZone: 'UTC'
//         });
// console.log(programToDelete);
//         // Проверяем, совпадает ли дата с одной из сохраненных дат
//         const isDateInSavedDates = savedDates.some(savedDate => {
//             const dateToCheck = parseCustomDate(savedDate);
//             // Вычитаем один день из даты, сохраненной в savedDates
//             dateToCheck.setDate(dateToCheck.getDate() + 1);
            
//             const formattedSavedDate = dateToCheck.toLocaleDateString('ru-RU', {
//                 day: '2-digit',
//                 month: 'long',
//                 year: 'numeric',
//                 timeZone: 'UTC'
//             });
// console.log(formattedSavedDate);
//             return formattedSavedDate === formattedProgramDate;
            
//         });

//         if (isDateInSavedDates) {
//             // Показываем диалог подтверждения удаления
//             const confirmation = confirm(`🥶Вы точно хотите удалить программу "${programName}"?`);
//             if (confirmation) {
//                 // Удаляем программу, если пользователь подтвердил
//                 sportAddedPrograms = sportAddedPrograms.filter((program) => program.name !== programName);
//                 localStorage.setItem('addedPrograms', JSON.stringify(sportAddedPrograms));
//                 renderAddedPrograms(); // Обновляем отображение
//             }
//         } else {
//             // Выводим ошибку, если дата не совпадает
//             alert(`Невозможно удалить программу '${programName}', так как её дата не совпадает с сохраненными датами.`);
//         }
//     } else {
//         alert(`Программа '${programName}' не найдена.`);
//     }
// }

// // Функция для парсинга пользовательской даты
// function parseCustomDate(dateStr) {
//     // Убираем "г." и пробелы
//     dateStr = dateStr.replace(/ г\.$/, '').trim();

//     // Разбиваем строку на день, месяц и год
//     const [day, monthName, year] = dateStr.split(' ');

//     // Карта месяцев
//     const monthMap = {
//         "января": 0,
//         "февраля": 1,
//         "марта": 2,
//         "апреля": 3,
//         "мая": 4,
//         "июня": 5,
//         "июля": 6,
//         "августа": 7,
//         "сентября": 8,
//         "октября": 9,
//         "ноября": 10,
//         "декабря": 11
//     };

//     const month = monthMap[monthName]; // Получаем номер месяца
//     const parsedDay = parseInt(day, 10); // Преобразуем день в число
//     const parsedYear = parseInt(year, 10); // Преобразуем год в число

//     // Создаем объект Date
//     return new Date(parsedYear, month, parsedDay);
// }







// Открытие модального окна календаря
sportCalendarButton.onclick = function() {
    exercisesModal.style.display = 'none'; // Закрытие модального окна для упражнений.
    modal1.style.display = 'none'; // Закрытие модального окна для тренировки
    sportCalendarModal.style.display = "block";
    // sportCurrentDateDiv.innerText = new Date().toLocaleDateString(); // Показываем текущую дату
}

// Закрытие модального окна
sportCloseButton.onclick = function() {
    sportCalendarModal.style.display = "none";
}

// Закрытие второго модального окна
sportCloseButton2.onclick = function() {
    sportCalendarModal2.style.display = "none";
}

// Закрытие окна с упражнениями
sportCloseExerciseButton.onclick = function() {
    sportExerciseModal.style.display = "none";
}

// Закрытие окна с подходами
sportApproachCloseButton.onclick = function() {
    sportApproachModal.style.display = "none";
}

// Обработка нажатия на кнопку "Добавить" для открытия модального окна программ
sportAddButton.onclick = function() {
    sportCalendarModal2.style.display = "block";
    loadAvailablePrograms(); // Загрузка доступных программ при открытии
}










// Функция для отображения доступных программ
function loadAvailablePrograms() {
    const storedWorkouts = localStorage.getItem('workouts'); // Получаем данные из localStorage
    const sportPrograms = storedWorkouts ? JSON.parse(storedWorkouts) : []; // Преобразуем в массив, если существуют, иначе пустой массив
    sportAvailableProgramsDiv.innerHTML = ''; // Очищаем предыдущие программы
    sportSelectedPrograms = []; // Сбрасываем выбранные программы

    // Проверяем есть ли программы
    if (sportPrograms.length === 0) {
        const noProgramsMessage = document.createElement('div');
        noProgramsMessage.className = "sportAvailableProgramsNone";
        noProgramsMessage.innerText = 'Нет доступных программ.';
        sportAvailableProgramsDiv.appendChild(noProgramsMessage);
        return;
    }

    sportPrograms.forEach(program => {
        const sportDiv = document.createElement('div');
        sportDiv.className = "WrapProgramAll";
        sportDiv.style.backgroundColor = program.color || 'gray'; // Устанавливаем цвет фона на основе цвета программы
        // sportDiv.style.padding = '10px'; // Добавляем отступы для лучшего вида
        // sportDiv.style.borderRadius = '5px'; // Округляем углы
        // sportDiv.style.color = '#fff'; // Цвет текста для лучшей читаемости

        // Создаем элемент для названия программы
        const programName = document.createElement('div');
        programName.className = "formattedProgramName";
        programName.innerText = program.name; // Выводим название программы
        // programName.style.fontWeight = 'bold'; // Сделаем название жирным

        // Создаем элемент для цвета программы
        const programColor = document.createElement('div');
        programColor.className = "formattedProgramColor";
        programColor.innerText = ` (Цвет: ${program.color || 'Нет цвета'})`; // Отображаем цвет программы
        programColor.style.color = program.color || 'black'; // Устанавливаем цвет текста в соответствии с цветом программы

        sportDiv.appendChild(programName);
        sportDiv.appendChild(programColor);

        

        // Проверяем, есть ли упражнения у текущей программы
        if (program.exercises && program.exercises.length > 0) {
            const exercisesDiv = document.createElement('div');
            exercisesDiv.className = "WrapProgram";
            // exercisesDiv.style.marginLeft = '20px'; // Добавляем отступ для улучшения восприятия
            exercisesDiv.style.backgroundColor = program.color || 'lightgray'; // Устанавливаем цвет фона на основе цвета программы
            // exercisesDiv.style.padding = '10px'; // Добавляем отступы
            // exercisesDiv.style.borderRadius = '5px'; // Округляем углы

            program.exercises.forEach(exercise => {
                const exerciseDiv = document.createElement('div');
                exerciseDiv.className = "WrapProgramExercise";
                // exerciseDiv.style.margin = '5px 0'; // Отступ между элементами
                exerciseDiv.style.backgroundColor = exercise.color || 'gray'; // Устанавливаем цвет фона на основе цвета упражнения
                // exerciseDiv.style.padding = '10px'; // Добавляем немного отступов для лучшего вида
                // exerciseDiv.style.borderRadius = '5px'; // Округляем углы

                // Заполняем информацию об упражнении
                exerciseDiv.innerHTML = `
                    <div class="formattedExerciseTitleWrapper">
                        <div class="formattedExerciseTitle">${exercise.title || 'Не указано'}</div>
                    </div>
                    <div class="formattedExerciseClassWrapper">
                        <div class="formattedExerciseClass1">${exercise.class1 || 'Нет данных'}</div>
                        <div class="formattedExerciseClass2">${exercise.class2 || 'Нет данных'}</div>
                        <div class="formattedExerciseColor">${exercise.color || 'Нет данных'}</div>
                    </div>
                    <div class="formattedExerciseDescriptionWrapper">
                        <div class="formattedExerciseDescription">${exercise.description || 'Нет описания'}</div>
                    </div>
                `;

                exercisesDiv.appendChild(exerciseDiv);
            });

            sportDiv.appendChild(exercisesDiv); // Добавляем список упражнений к программе
        } else {
            const noExercisesMessage = document.createElement('div');
            noExercisesMessage.innerText = 'Нет доступных упражнений.';
            sportDiv.appendChild(noExercisesMessage);
        }

            // Создаем кнопку для выбора программы
            const sportSelectButton = document.createElement('button');
            // sportSelectButton.className = "formattedProgramAddProgram";
            sportSelectButton.id = "formattedProgramAddProgram";
            // sportSelectButton.innerText = 'Выбрать';
            sportSelectButton.innerHTML = `
                <img id="formattedProgramAddProgramImg"; src="./img/plus.gif"></img>
            `;
            // <img class="formattedProgramAddProgrambuttonOne" src="./img/plus.gif"></img>
            // <img class="formattedProgramAddProgrambuttonTwo" src="./img/minus.gif"></img>



            sportSelectButton.onclick = () => {
                toggleProgramSelection(program, sportSelectButton);
            };
            sportDiv.appendChild(sportSelectButton);

        sportAvailableProgramsDiv.appendChild(sportDiv); // Добавляем программу в общий контейнер
        
    });
}



// Функция для переключения состояния выбора программы
function toggleProgramSelection(program, button) {
    const index = sportSelectedPrograms.indexOf(program);
    if (index > -1) {
        sportSelectedPrograms.splice(index, 1); // Убираем программу из выбранных
        button.style.backgroundColor = ''; // Сбрасываем стиль кнопки
    } else {
        sportSelectedPrograms.push(program); // Добавляем программу в выбранные
        button.style.backgroundColor = 'lightgreen'; // Меняем стиль кнопки для выбранной программы
    }
}



// // Функция для переключения состояния выбора программы
// function toggleProgramSelection(program, button) {
//     const index = sportSelectedPrograms.indexOf(program);
    
//     // Находим элемент для изображения
//     const statusImage = document.getElementById('formattedProgramAddProgramImg'); // Замените на свой ID

//     if (index > -1) {
//         sportSelectedPrograms.splice(index, 1); // Убираем программу из выбранных
//         button.style.backgroundColor = ''; // Сбрасываем стиль кнопки
//         statusImage.src = './img/plus.gif'; // Меняем картинку на плюс
//     } else {
//         sportSelectedPrograms.push(program); // Добавляем программу в выбранные
//         button.style.backgroundColor = 'lightgreen'; // Меняем стиль кнопки для выбранной программы
//         statusImage.src = './img/minus.gif'; // Меняем картинку на минус
//     }
// }
















// // Функция добавления выбранных программ в список добавленных
// sportAddSelectedButton.onclick = function() {
//     sportSelectedPrograms.forEach(selectedProgram => {
//         // Проверяем, чтобы не добавлять дубликаты
//         if (!sportAddedPrograms.find(p => p.name === selectedProgram.name)) {
//             const newProgram = {
//                 name: selectedProgram.name,
//                 color: selectedProgram.color,
//                 date: new Date().toISOString() // Сохраняем текущую дату добавления
//             };
//             sportAddedPrograms.push(newProgram);
//             localStorage.setItem('addedPrograms', JSON.stringify(sportAddedPrograms)); // Сохраняем программы в localStorage
//         }
//     });
//     renderAddedPrograms(); // Обновляем отображение
//     sportCalendarModal2.style.display = "none"; // Закрываем окно после добавления
// }

// Можно настроить отображение  не удалять!!!
// Можно настроить отображение  не удалять!!!
// Можно настроить отображение  не удалять!!!
// Можно настроить отображение  не удалять!!!
// Функция добавления выбранных программ в список добавленных
// Функция форматирования даты в требуемом формате "17 января 2025 г."
// Функция добавления выбранных программ в список добавленных
// Функция добавления выбранных программ в список добавленных
sportAddSelectedButton.onclick = function() {
    // Извлекаем массив savedDates из localStorage
    const savedDates = JSON.parse(localStorage.getItem('savedDates')) || [];
    
    // Предполагаем, что мы хотим использовать первую дату из массива savedDates
    const currentDateFromSaved = savedDates[0]; // Извлекаем первую дату (например)

    // Проверяем, есть ли уже добавленные программы с выбранной датой
    const isDateExists = sportAddedPrograms.some(program => {
        const formattedProgramDate = new Date(program.date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC'
        });
        return formattedProgramDate === currentDateFromSaved;
    });

    // Если с такой датой программы уже есть, проверяем по имени
    if (isDateExists) {
        const existingProgramNames = sportAddedPrograms
            .filter(program => {
                const formattedProgramDate = new Date(program.date).toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    timeZone: 'UTC'
                });
                return formattedProgramDate === currentDateFromSaved;
            })
            .map(program => program.name); // Список имен программ, добавленных на эту дату

        // Проверяем выбранные программы на наличие дубликатов
        const duplicateNames = sportSelectedPrograms.filter(selectedProgram => 
            existingProgramNames.includes(selectedProgram.name)
        ).map(program => program.name);

        // Если найдены дубликаты, выводим ошибку
        if (duplicateNames.length > 0) {
            alert(`Программы уже добавлены на ${currentDateFromSaved}: ${duplicateNames.join(', ')}. Выберите другие.`);
            return; // Завершаем выполнение функции
        }
    }

    // Если с такой датой программ еще нет, добавляем выбранные программы
    sportSelectedPrograms.forEach(selectedProgram => {
        const newProgram = {
            name: selectedProgram.name,
            color: selectedProgram.color,
            date: new Date().toISOString() // Сохраняем текущую дату добавления в ISO-формате
        };
        sportAddedPrograms.push(newProgram); // Добавляем новую программу
    });

    // Сохраняем программы в localStorage
    localStorage.setItem('addedPrograms', JSON.stringify(sportAddedPrograms));

    renderAddedPrograms(); // Обновляем отображение
    sportCalendarModal2.style.display = "none"; // Закрываем окно после добавления
};

// Можно настроить отображение  не удалять!!!
// Можно настроить отображение  не удалять!!!
// Можно настроить отображение  не удалять!!!
// // Функция добавления выбранных программ в список добавленных
// sportAddSelectedButton.onclick = function() {
//     sportSelectedPrograms.forEach(selectedProgram => {
//         // Проверяем, чтобы не добавлять дубликаты
//         if (!sportAddedPrograms.find(p => p.name === selectedProgram.name)) {
//             const newProgram = {
//                 name: selectedProgram.name,
//                 color: selectedProgram.color,
//                 date: new Date().toISOString() // Сохраняем текущую дату добавления
//             };
//             sportAddedPrograms.push(newProgram);
//             localStorage.setItem('addedPrograms', JSON.stringify(sportAddedPrograms)); // Сохраняем программы в localStorage
//         }
//     });
//     renderAddedPrograms(); // Обновляем отображение
//     sportCalendarModal2.style.display = "none"; // Закрываем окно после добавления
// }
// function renderAddedPrograms() {
//     const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
//     sportApproachesDiv.innerHTML = ''; 

//     sportAddedPrograms.forEach((program) => {
//         const sportDiv = document.createElement('div');
//         sportDiv.style.backgroundColor = program.color || 'transparent';  

//         // Контейнер для даты
//         const dateDiv = document.createElement('div');
//         dateDiv.id = 'dateAdd'; // Устанавливаем id
//         dateDiv.innerText = new Date(program.date).toLocaleDateString('ru-RU', {
//             day: '2-digit',
//             month: 'long',
//             year: 'numeric'
//         }); // Форматируем дату

//         // Контейнер для имени программы
//         const nameDiv = document.createElement('div');
//         nameDiv.innerText = program.name; // Название программы

//         // Контейнер для цвета программы
//         const colorDiv = document.createElement('div');
//         colorDiv.innerText = `Цвет: ${program.color || 'Нет цвета'}`; // Цвет программы

//         // Добавляем контейнеры в общий div программы
//         sportDiv.appendChild(dateDiv); 
//         sportDiv.appendChild(nameDiv);
//         sportDiv.appendChild(colorDiv);

//         // Логика работы с упражнениями
//         const workout = workouts.find(workout => workout.name === program.name);
//         if (workout && workout.exercises && workout.exercises.length > 0) {
//             const exercisesDiv = document.createElement('div'); 
//             workout.exercises.forEach(exercise => {
//                 const exerciseDiv = document.createElement('div');
//                 exerciseDiv.innerHTML = `
//                     ${exercise.title || 'Не указано'}<span>, ${exercise.description || 'Нет описания'}</span>, <span>${exercise.class1 || 'Нет данных'}</span>, <span>${exercise.class2 || 'Нет данных'}</span>. 
//                 `;
//                 // <span style="color: ${exercise.color || 'black'};">Цвет: ${exercise.color || 'Нет данных'}</span>
//                 exercisesDiv.appendChild(exerciseDiv); 
//             });
//             sportDiv.appendChild(exercisesDiv); 
//         }

//         // Создание кнопок
//         const sportStartButton = document.createElement('button');

//         sportStartButton.innerText = 'Начать';
//         sportStartButton.onclick = () => {
//             openExerciseModal(program.name);
//         };

//         const sportDeleteButton = document.createElement('button');
//         sportDeleteButton.innerText = 'Удалить';
//         sportDeleteButton.onclick = () => {
//             if (confirm(`Вы действительно хотите удалить ${program.name}?`)) {
//                 deleteProgram(program.name); 
//             }
//         };

//         sportDiv.appendChild(sportStartButton); 
//         sportDiv.appendChild(sportDeleteButton); 
//         sportApproachesDiv.appendChild(sportDiv); 
//     });
// }


// Функция для открытия модального окна с упражнениями для конкретной тренировки
function openExerciseModal(programName) {
    sportExerciseTitle.innerHTML = `${programName}`;
    sportExerciseList.innerHTML = ''; // Очищаем предыдущий список упражнений

    // Получаем данные о тренировках из localStorage
    const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || []; // Если данных нет, возвращаем пустой массив

    // console.log("Stored Workouts:", storedWorkouts); // Логируем данные о тренировках
    // console.log("Program Name:", programName); // Логируем имя программы

    // Находим тренировку по имени
    const workout = storedWorkouts.find(workout => workout.name === programName);
    
    if (workout && workout.exercises) {
        console.log("Exercises for the workout:", workout.exercises); // Логируем упражнения для тренировки

        workout.exercises.forEach(exercise => {
            const sportLi = document.createElement('div');
            sportLi.className = "sportExerciseWrap";
            sportLi.style.backgroundColor = exercise.color; // Устанавливаем цвет фона контейнера
            // sportLi.style.color = '#fff'; // Изменяем цвет текста для лучшей читаемости
            // sportLi.style.padding = '10px'; // Добавляем немного отступов
            // sportLi.style.margin = '5px 0'; // Отступ между элементами списка
            // sportLi.style.borderRadius = '5px'; // Округляем углы

            sportLi.innerHTML = `
                <div class="sportExercise">
                <div class="sportExerciseExerciseTitleWrap">
                <div class="sportExerciseExerciseTitle">${exercise.title}</div>
                </div>
                <div class="sportExerciseClassWrap">
                <div class="sportExerciseClass1">${exercise.class1}</div> 
                <div class="sportExerciseClass2">${exercise.class2}</div>
                </div>
                <div class="sportExerciseDescriptionWrap">
                <div class="sportExerciseDescription">${exercise.description}</div>
                </div>
                </div>
            `;
                // <strong>${exercise.title}</strong><br>
                // <span>Описание: ${exercise.description}</span><br>
                // <span>Класс 1: ${exercise.class1}</span><br>
                // <span>Класс 2: ${exercise.class2}</span><br>
                // <span>Цвет: ${exercise.color}</span>

            const sportAddApproachButton = document.createElement('button');
            sportAddApproachButton.className = "sportExerciseButton";
            sportAddApproachButton.innerHTML = `
                <img id="formattedProgramAddProgramImg"; src="./img/plus.gif"></img>
            `;
            sportAddApproachButton.onclick = () => {
                openApproachModal(exercise, programName);
            };

            sportLi.appendChild(sportAddApproachButton);
            sportExerciseList.appendChild(sportLi);
        });
    } else {
        const noExercisesMessage = document.createElement('li');
        noExercisesMessage.innerText = 'Нет доступных упражнений для этой программы.';
        sportExerciseList.appendChild(noExercisesMessage);
    }

    sportExerciseModal.style.display = "block"; // Показываем модальное окно с упражнениями
}

// Функция для открытия модального окна добавления подхода
function openApproachModal(exercise, program) {
    // Формируем заголовок, который будет содержать все необходимые данные
    sportApproachTitle.innerText = `
        ${exercise.title}
        ${exercise.class1}
        ${exercise.class2}
        ${exercise.description}
    `;
        // Цвет: ${exercise.color}
    
    // Очищаем поля ввода
    sportWeightInput.value = ''; // Очищаем поле веса
    sportRepetitionsInput.value = ''; // Очищаем поле повторений
    sportleadTimeInput.value = ''; // Очищаем поле время выполнения
    sportrestTimeInput.value = ''; // Очищаем поле время отдыха
    sportAnote.value = ''; // Очищаем поле коментарий
    sportApproachStatisticsDiv.innerHTML = ''; // Очищаем статистику
    
    
    
    // Сохраняем текущее упражнение и текущую программу
    currentExercise = exercise; 
    currentProgram = program; 

    // Загружаем существующую статистику
    loadStatistics(); 

    // Устанавливаем цвет фона контейнера на основе exercise.color
    const approachContainer = document.getElementById('sport-approach-title'); // Убедитесь, что это правильный ID вашего контейнера
    approachContainer.style.backgroundColor = exercise.color; // Устанавливаем цвет фона

    // Показываем модальное окно подхода
    sportApproachModal.style.display = "block"; 
    currentEntryIndex = null; // Сбрасываем индекс редактируемого подхода
}

// Функция для загрузки статистики из localStorage
function loadStatistics() {
    const storedStatistics = JSON.parse(localStorage.getItem(currentProgram)) || {}; // Получаем данные из localStorage
    const exerciseStatistics = storedStatistics[currentExercise.title] || []; // Получаем статистику для конкретного упражнения на основе его заголовка

    sportApproachStatisticsDiv.innerHTML = ''; // Очищаем предыдущие данные

    // Отображаем каждый подход
    exerciseStatistics.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.innerText = `Дата: ${entry.date}, Вес: ${entry.weight} кг, Повторения: ${entry.repetitions}, Время выполнения: ${entry.leadtime}, Время отдыха: ${entry.resttime}, Коментарий: ${entry.anote}`;

        const editButton = document.createElement('button');
        editButton.innerText = 'Редактировать';
        editButton.onclick = () => {
            editApproach(index); // Редактируем подход
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Удалить';
        deleteButton.onclick = () => {
            if (confirm('Вы действительно хотите удалить этот подход?')) {
                deleteApproach(index); // Удаляем подход
            }
        };

        entryDiv.appendChild(editButton); // Добавляем кнопку редактирования
        entryDiv.appendChild(deleteButton); // Добавляем кнопку удаления
        sportApproachStatisticsDiv.appendChild(entryDiv); // Добавляем элемент к контейнеру статистики
    });
}

// Функция для редактирования подхода
function editApproach(index) {
    const storedStatistics = JSON.parse(localStorage.getItem(currentProgram)) || {}; // Получаем данные из localStorage
    const exerciseStatistics = storedStatistics[currentExercise.title] || []; // Получаем статистику для конкретного упражнения
    const entry = exerciseStatistics[index]; // Получаем данные подхода по индексу
    
    sportWeightInput.value = entry.weight; // Устанавливаем вес для редактирования
    sportRepetitionsInput.value = entry.repetitions; // Устанавливаем повторения для редактирования
    sportleadTimeInput.value = entry.leadtime; // Устанавливаем время выполнения для редактирования
    sportrestTimeInput.value = entry.resttime; // Устанавливаем время отдыха для редактирования
    sportAnote.value = entry.anote; // Устанавливаем коментарий для редактирования
    currentEntryIndex = index; // Сохраняем индекс редактируемого подхода

    sportSaveApproachButton.innerText = 'Сохранить изменения'; // Изменяем текст кнопки на "Сохранить изменения"
}

// Функция для удаления подхода
function deleteApproach(index) {
    const storedStatistics = JSON.parse(localStorage.getItem(currentProgram)) || {}; // Получаем данные из localStorage
    const exerciseStatistics = storedStatistics[currentExercise.title] || []; // Получаем статистику для конкретного упражнения
    
    // Удаляем подход по индексу
    exerciseStatistics.splice(index, 1); 

    // Если есть оставшиеся подходы, сохраняем обновленную статистику
    if (exerciseStatistics.length > 0) {
        storedStatistics[currentExercise.title] = exerciseStatistics; // Обновляем массив подходов
    } else {
        delete storedStatistics[currentExercise.title]; // Удаляем упражнение, если у него больше нет подходов
    }

    // Сохраняем обновленную статистику в localStorage
    localStorage.setItem(currentProgram, JSON.stringify(storedStatistics)); 

    loadStatistics(); // Обновляем отображение статистики
}

// Функция для сохранения подхода
sportSaveApproachButton.onclick = function() {
    const weight = sportWeightInput.value; // Получаем значение веса
    const repetitions = sportRepetitionsInput.value; // Получаем значение повторений
    const leadtime = sportleadTimeInput.value; // Получаем время выполнения
    const resttime = sportrestTimeInput.value; // Получаем время отдыха
    const anote = sportAnote.value; // Получаем коментарий

    // Проверка на наличие значений
    if (weight && repetitions && resttime) {
        const now = new Date(); // Получаем текущую дату и время
        const dateTimeString = now.toLocaleString(); // Форматируем дату и время

        // Создаем объект подхода
        const approach = {
            date: dateTimeString,
            weight: weight,
            repetitions: repetitions,
            leadtime: leadtime,
            resttime: resttime,
            anote: anote,
            description: currentExercise.description, // Предположим, что у вас есть доступ к объекту упражнения
            title: currentExercise.title,
            class1: currentExercise.class1,
            class2: currentExercise.class2
        };

        const storedStatistics = JSON.parse(localStorage.getItem(currentProgram)) || {};
        // Создаем массив для статистики конкретного упражнения, если его не существует
        storedStatistics[currentExercise.title] = storedStatistics[currentExercise.title] || [];

        if (currentEntryIndex !== null) {
            // Если редактируем, заменяем существующий подход
            storedStatistics[currentExercise.title][currentEntryIndex] = approach;
            currentEntryIndex = null; // Сбрасываем индекс редактируемого подхода
            sportSaveApproachButton.innerText = 'Добавить подход'; // Возвращаем текст кнопки
        } else {
            // Иначе добавляем новый подход
            storedStatistics[currentExercise.title].push(approach);
        }

        // Сохраняем обновленную статистику
        localStorage.setItem(currentProgram, JSON.stringify(storedStatistics)); // Обновляем localStorage

        loadStatistics(); // Обновляем отображение статистики
        sportWeightInput.value = ''; // Очищаем поле веса
        sportRepetitionsInput.value = ''; // Очищаем поле повторений
        sportleadTimeInput.value = ''; // Очищаем поле время выполнения
        sportrestTimeInput.value = ''; // Очищаем поле время отдыха
        sportAnote.value = ''; // Очищаем поле коментарий
    } else {
        alert("Пожалуйста, заполните все поля."); // Сообщение об ошибке
    }
}

// Закрытие модального окна при клике на кнопки закрытия
sportCloseButton.onclick = function() {
    sportCalendarModal.style.display = "none";
}

sportCloseButton2.onclick = function() {
    sportCalendarModal2.style.display = "none";
}

sportCloseExerciseButton.onclick = function() {
    sportExerciseModal.style.display = "none";
}

sportApproachCloseButton.onclick = function() {
    sportApproachModal.style.display = "none";
}

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDay = null;
let savedDates = JSON.parse(localStorage.getItem('savedDates')) || []; // Инициализируем массив из localStorage

function updateCalendar() {
    const calendarElement = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('current-month');
    currentMonthElement.innerText = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    calendarElement.innerHTML = '';

    // Пустые ячейки до начала месяца
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('day');
        calendarElement.appendChild(emptyDiv);
    }

    // Заполнение днями месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.innerText = day;

        // Создание корректной даты
        const date = new Date(currentYear, currentMonth, day);
        date.setHours(0, 0, 0);
        dayDiv.setAttribute('data-date', date.toISOString().split('T')[0]); // Формат YYYY-MM-DD

        const today = new Date();
        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            dayDiv.classList.add('today');
        }

        dayDiv.onmouseover = function() {
            dayDiv.classList.add('hovered');
        };
        dayDiv.onmouseout = function() {
            dayDiv.classList.remove('hovered');
        };
        dayDiv.onclick = function() {
            if (selectedDay) {
                selectedDay.classList.remove('selected');
            }
            selectedDay = dayDiv;
            dayDiv.classList.add('selected');
            const selectedDate = dayDiv.getAttribute('data-date'); // Получаем дату
            const newDate = addOneDay(selectedDate); // Добавляем 1 день
            
            // Очищаем массив и добавляем новую дату
            savedDates = []; // Удаляем все имеющиеся даты из массива
            savedDates.push(formatDate(newDate)); // Добавляем новую дату
            localStorage.setItem('savedDates', JSON.stringify(savedDates)); // Сохраняем массив в localStorage
            
            // console.log('Выбрали дату:', formatDate(selectedDate)); // Выводим выбранную дату
            // console.log('Дата через 1 день:', formatDate(newDate)); // Выводим новую дату
            // console.log('Сохраненные даты:', savedDates); // Выводим массив сохраненных дат
        };

        calendarElement.appendChild(dayDiv);
    }
}

// Функция для добавления одного дня
function addOneDay(selectedDate) {
    const date = new Date(selectedDate); // Создаем объект даты из строки
    date.setDate(date.getDate() + 1); // Увеличиваем день на 1
    return date; // Возвращаем новый объект даты
}

// Функция для форматирования даты
function formatDate(dateString) {
    const date = new Date(dateString); // Создаем объект даты из строки
    const options = { day: 'numeric', month: 'long', year: 'numeric', locale: 'ru-RU' };

    return date.toLocaleDateString('ru-RU', options); // Форматируем дату и добавляем "г."
}

document.getElementById('prev-month').onclick = function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
}

document.getElementById('next-month').onclick = function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
}

updateCalendar();


// Загружаем добавленные программы при загрузке страницы
loadAddedPrograms();










// ==============================================================================================================================================================================
// тренировки sport-calendar
// ==============================================================================================================================================================================

// Получаем элементы из DOM
const programsButton = document.getElementById('programs'); // Кнопка для открытия окна тренировок
const modal1 = document.getElementById('modal1'); // Модальное окно для списка тренировок
const closeModal1 = document.getElementById('closeModal1'); // Кнопка закрытия окна №1
const addWorkoutButton = document.getElementById('addWorkout'); // Кнопка для добавления новой тренировки
const modal2 = document.getElementById('modal2'); // Модальное окно для добавления новой тренировки
const closeModal2 = document.getElementById('closeModal2'); // Кнопка закрытия окна №2
const workoutList = document.getElementById('workoutList'); // Контейнер для отображения списка тренировок
const workoutNameInput = document.getElementById('workoutName'); // Поле для ввода названия тренировки
const currentWorkoutExerciseList = document.getElementById('currentWorkoutExerciseList'); // Контейнер для отображения списка упражнений в текущей тренировке
const availableExercisesContainer = document.getElementById('availableExercises'); // Контейнер для всех доступных упражнений
const saveWorkoutButton = document.getElementById('saveWorkout'); // Кнопка для сохранения текущей тренировки
const classesContainer = document.getElementById('classesContainer'); // Контейнер для отображения классов
const editWorkoutButton = document.getElementById('editWorkout'); // Кнопка для редактирования тренировок
const colorPicker = document.getElementById('colorPicker');

let workouts = JSON.parse(localStorage.getItem('workouts')) || []; // Получаем тренировки из localStorage, или пустой массив, если они не найдены
let availableExercises = JSON.parse(localStorage.getItem('exercises')); // Получаем упражнения из localStorage
let availableClasses = JSON.parse(localStorage.getItem('classes')); // Получение списка классов из localStorage
let currentWorkout = null; // Переменная для текущей тренировки
let currentEditingIndex = -1; // Индекс редактируемой тренировки
let selectedColor = 'rgba(255, 0, 0, 0.1)'; // Значение по умолчанию (красный с прозрачностью 80%)


// Открываем окно №1 при нажатии на кнопку "Открыть тренировки"
programsButton.onclick = function() {
    sportCalendarModal.style.display = "none"; // Закрытие модального окна для календаря
    exercisesModal.style.display = 'none'; // Закрытие модального окна для упражнений.
    modal1.style.display = 'block'; // Показываем модальное окно
    displayWorkouts(); // Отображаем список тренировок
    // displayClasses(); // Отображаем список классов
}

// Закрываем окно №1 при нажатии на "x"
closeModal1.onclick = function() {
    modal1.style.display = 'none'; // Прячем модальное окно
}

// Обработчик событий для выбора цвета
colorPicker.onchange = function() {
    const color = colorPicker.value; // Получаем выбранный цвет
    selectedColor = `rgba(${getColorRGB(color)}, 0.1)`; // Присваиваем цвет с прозрачностью
};

// Функция для преобразования названия цвета в RGB
function getColorRGB(color) {
    const colors = {
        red: '255, 0, 0',
        green: '0, 255, 0',
        blue: '0, 0, 255',
        yellow: '255, 255, 0',
        purple: '128, 0, 128'
    };
    return colors[color] || '255, 255, 255'; // По умолчанию белый
}

// Открываем окно №2 для добавления новой тренировки или редактирования существующей
addWorkoutButton.onclick = function() {
    modal2.style.display = 'block'; // Показываем модальное окно для добавления тренировки
    workoutNameInput.value = ''; // Очищаем поле ввода названия тренировки
    currentWorkout = { name: '', exercises: [] }; // Инициализируем текущую тренировку
    displayAvailableExercises(); // Отображаем доступные упражнения
    displayExercises(); // Обновляем отображение списка упражнений
}

saveWorkoutButton.onclick = function() {
    const workoutName = workoutNameInput.value; // Получаем название текущей тренировки
    if (workoutName) { // Проверяем, что название введено
        if (!currentWorkout) {
            currentWorkout = { name: workoutName, exercises: [], color: selectedColor }; // Создаем новую тренировку с цветом
        } else {
            currentWorkout.name = workoutName; // Устанавливаем название текущей тренировки
            currentWorkout.color = selectedColor; // Обновляем цвет контейнера
        }

        // Применяем выбранный цвет фона
        const classesContainer = document.getElementById('classesContainer');
        classesContainer.style.backgroundColor = selectedColor; // Применяем выбранный цвет фона

        if (currentEditingIndex === -1) { // Если это новая тренировка
            workouts.push(currentWorkout); // Добавляем текущую тренировку в массив
        } else { // Если это редактирование существующей тренировки
            workouts[currentEditingIndex] = currentWorkout; // Обновляем существующую тренировку
        }

        currentWorkout = null; // Обнуляем текущую тренировку
        currentEditingIndex = -1; // Обнуляем индекс редактирования
        modal2.style.display = 'none'; // Закрываем модальное окно
        displayWorkouts(); // Обновляем отображение списка тренировок
        localStorage.setItem('workouts', JSON.stringify(workouts)); // Сохраняем массив тренировок в localStorage
    }
};

// Закрываем окно №2 при нажатии на "x"
closeModal2.onclick = function() {
    modal2.style.display = 'none'; // Прячем модальное окно
}

// Отображаем список тренировок
function displayWorkouts() {
    workoutList.innerHTML = ''; // Очищаем текущее содержимое контейнера
    // let workouts = JSON.parse(localStorage.getItem('workouts')) || []; // Получаем тренировки из localStorage, или пустой массив, если они не найдены
    workouts.forEach((workout, index) => { // Перебираем каждую тренировку в массиве
        const workoutElement = document.createElement('div'); // Создаем новый элемент для каждой тренировки
        workoutElement.style.backgroundColor = workout.color || 'white'; // Устанавливаем цвет фона контейнера
        workoutElement.style.padding = '10px'; // Добавляем немного отступов
        workoutElement.style.margin = '5px'; // Добавляем немного внешних отступов
        workoutElement.style.borderRadius = '5px'; // Закругляем углы

        workoutElement.innerHTML = `${workout.name}`; // Вставляем название тренировки

        // Получаем актуальный список упражнений для текущей тренировки
        const updatedExercises = workout.exercises
            .map(currentExercise => {
                const availableExercise = availableExercises.find(availableExercise => 
                    availableExercise.id === currentExercise.id // Сравнение по id
                );

                // Если упражнение найдено, обновляем его данные
                if (availableExercise) {
                    return {
                        ...currentExercise, // Сохраняем оригинальные данные
                        title: availableExercise.title,
                        description: availableExercise.description,
                        class1: availableExercise.class1,
                        class2: availableExercise.class2,
                        color: availableExercise.color
                    };
                }
                return null; // Если не найдено, возвращаем null
            })
            .filter(Boolean); // Убираем возможные null значения

        // Отображаем список упражнений для текущей тренировки strong
        if (updatedExercises.length > 0) {
            workoutElement.innerHTML += `<ul>${updatedExercises.map(ex =>
                `<li style="background-color: ${ex.color || 'transparent'}; padding: 10px; margin: 5px 0; border-radius: 5px;">
                    ${ex.title}
                    - Описание: ${ex.description || 'не указано'} 
                    - Класс 1: ${ex.class1 || 'не указан'} 
                    - Класс 2: ${ex.class2 || 'не указан'}
                </li>`).join('')}</ul>`; // Добавляем детали для каждого упражнения
        } else {
            workoutElement.innerHTML += '<p>Без упражнений</p>'; // Добавляем сообщение, если нет актуальных упражнений
        }

        // Добавляем кнопки для редактирования, удаления и перемещения тренировки
        workoutElement.innerHTML += `
            <button onclick="editWorkout(${index})">Редактировать</button>
            <button onclick="deleteWorkout(${index})">Удалить</button>
            <button onclick="moveWorkout(${index}, -1)">Вверх</button>
            <button onclick="moveWorkout(${index}, 1)">Вниз</button>`;

        workoutList.appendChild(workoutElement); // Добавляем элемент тренировки в контейнер
    });
}

// Функция для перемещения тренировки вверх или вниз
function moveWorkout(index, direction) {
    const newIndex = index + direction;
    
    // Проверяем, находится ли новое положение в пределах массива
    if (newIndex >= 0 && newIndex < workouts.length) {
        // Меняем местами тренировки
        [workouts[index], workouts[newIndex]] = [workouts[newIndex], workouts[index]];
        displayWorkouts(); // Обновляем отображение списка тренировок
    }
}

// Удаляем тренировку по индексу
function deleteWorkout(index) {
    // Запрашиваем подтверждение у пользователя
    const confirmation = window.confirm("Вы уверены, что хотите удалить эту тренировку?");
    
    if (confirmation) { // Если пользователь подтвердил удаление
        workouts.splice(index, 1); // Удаляем тренировку из массива по индексу
        localStorage.setItem('workouts', JSON.stringify(workouts)); // Сохраняем обновленный массив тренировок в localStorage
        displayWorkouts(); // Обновляем отображение списка тренировок
    } else {
        // Если пользователь отменил, ничего не делаем
        console.log("Удаление тренировки отменено.");
    }
}

// Переключение в режим редактирования
function editWorkout(index) {
    currentEditingIndex = index; // Устанавливаем индекс редактируемой тренировки
    const workout = workouts[index]; // Получаем тренировку для редактирования
    workoutNameInput.value = workout.name; // Устанавливаем название тренировки в поле ввода
    currentWorkout = { ...workout }; // Клонируем тренировку для работы с ней
    modal2.style.display = 'block'; // Открываем модальное окно редактирования
    displayAvailableExercises(); // Отображаем доступные упражнения
    displayExercises(); // Обновляем отображение списка упражнений текущей тренировки
}

// Отображаем доступные упражнения
function displayAvailableExercises() {
    availableExercisesContainer.innerHTML = ''; // Очищаем текущее содержимое контейнера
    availableExercises.forEach((exercise, index) => { // Перебираем каждое упражнение
        const exerciseElement = document.createElement('div'); // Создаем новый элемент для каждого упражнения
        
        // Обеспечим правильное отображение данных strong
        if (exercise.title && exercise.description) {
            exerciseElement.innerHTML = `${exercise.title} - ${exercise.description || 'не указано'} 
                - Класс 1: ${exercise.class1 || 'не указан'} 
                - Класс 2: ${exercise.class2 || 'не указан'} 
                <button onclick="addExercise(${index})">Добавить</button>`;
            
            // Устанавливаем цвет фона для элемента
            exerciseElement.style.backgroundColor = exercise.color || '#ffffff'; // Используем белый цвет по умолчанию, если цвет не указан

            // Добавляем дополнительные стили, чтобы улучшить внешний вид
            exerciseElement.style.padding = '10px';
            exerciseElement.style.margin = '5px 0';
            exerciseElement.style.borderRadius = '5px';
        } else {
            exerciseElement.innerHTML = '<strong>Название недоступно</strong>';
        }
        
        availableExercisesContainer.appendChild(exerciseElement); // Добавляем элемент упражнения в контейнер
    });
}

// Добавляем упражнение в текущую тренировку
function addExercise(index) {
    const selectedExercise = availableExercises[index]; // Получаем выбранное упражнение по индексу
    if (selectedExercise && currentWorkout) { // Проверяем, что есть выбранное упражнение и текущая тренировка
        // Создаем копию объекта, чтобы избежать ссылки на оригинал
        currentWorkout.exercises.push({...selectedExercise}); // Добавляем выбранное упражнение в массив упражнений текущей тренировки
        displayExercises(); // Обновляем отображение списка упражнений
    } 
}

// Отображаем упражнения в текущей тренировке
function displayExercises() {
    currentWorkoutExerciseList.innerHTML = ''; // Очищаем текущее содержимое контейнера для упражнений
    
    if (currentWorkout && currentWorkout.exercises) { // Если есть текущая тренировка и она имеет упражнения
        // Сравниваем упражнения с доступными и получаем актуальный список
        const updatedExercises = currentWorkout.exercises
            .map(currentExercise => {
                const availableExercise = availableExercises.find(availableExercise => 
                    availableExercise.id === currentExercise.id // Сравниваем по id
                );
                // Если доступное упражнение найдено, обновляем его данные
                return availableExercise ? {
                    ...currentExercise, // Сохраняем оригинальные данные
                    title: availableExercise.title,
                    description: availableExercise.description,
                    class1: availableExercise.class1,
                    class2: availableExercise.class1,
                    color: availableExercise.color
                } : null; // Если не найдено, возвращаем null
            })
            .filter(Boolean); // Убираем возможные null значения

        updatedExercises.forEach((exercise, index) => { // Перебираем все актуальные упражнения
            const exerciseElement = document.createElement('div'); // Создаем новый элемент для каждого упражнения
            
            // Обеспечим отображение актуальных данных strong
            exerciseElement.innerHTML = `${exercise.title}
                - Описание: ${exercise.description || 'не указано'} 
                - Класс 1: ${exercise.class1 || 'не указан'} 
                - Класс 2: ${exercise.class2 || 'не указан'} 
                <button onclick="removeExercise(${index})">Удалить</button>
                <button onclick="moveExercise(${index}, -1)">Вверх</button>
                <button onclick="moveExercise(${index}, 1)">Вниз</button>`;
            
            // Устанавливаем цвет фона для элемента
            exerciseElement.style.backgroundColor = exercise.color || '#ffffff'; // Используем белый цвет по умолчанию, если цвет не указан

            // Добавляем дополнительные стили, чтобы улучшить внешний вид
            exerciseElement.style.padding = '10px';
            exerciseElement.style.margin = '5px 0';
            exerciseElement.style.borderRadius = '5px';

            currentWorkoutExerciseList.appendChild(exerciseElement); // Добавляем элемент упражнения в контейнер
        });
    }
}
// Функция для перемещения упражнения вверх или вниз
function moveExercise(currentIndex, direction) {
    if (currentWorkout && currentWorkout.exercises) {
        const newIndex = currentIndex + direction;
        // Проверяем, находится ли новое положение в пределах массива
        if (newIndex >= 0 && newIndex < currentWorkout.exercises.length) {
            // Меняем местами упражнения, и сохраняем порядок
            const exercises = [...currentWorkout.exercises]; // Создаем копию массива
            [exercises[currentIndex], exercises[newIndex]] = [exercises[newIndex], exercises[currentIndex]]; // Меняем местами
            currentWorkout.exercises = exercises; // Сохраняем новый порядок в оригинальном массиве
            displayExercises(); // Обновляем отображение списка упражнений
        }
    }
}

// Удаляем упражнение из текущей тренировки
function removeExercise(index) {
    if (currentWorkout && currentWorkout.exercises) { // Если есть текущая тренировка и она имеет упражнения
        // Запрашиваем подтверждение у пользователя
        const confirmation = window.confirm("Вы уверены, что хотите удалить это упражнение?");
        
        if (confirmation) { // Если пользователь подтвердил удаление
            currentWorkout.exercises.splice(index, 1); // Удаляем упражнение по индексу
            displayExercises(); // Обновляем отображение списка упражнений
        } else {
            // Если пользователь отменил, ничего не делаем
            console.log("Удаление упражнения отменено.");
        }
    }
}

// // Загружаем тренировки из localStorage при открытии страницы
// window.onload = function() {
//     // workouts = JSON.parse(localStorage.getItem('workouts')) || []; // Загружаем массив тренировок из localStorage или создаем пустой массив
//     workouts = JSON.parse(localStorage.getItem('workouts')); // Загружаем массив тренировок из localStorage
//     // availableClasses = JSON.parse(localStorage.getItem('classes')) || []; // Загружаем массив классов из localStorage или создаем пустой массив
//     availableClasses = JSON.parse(localStorage.getItem('classes')); // Загружаем массив классов из localStorage
//     displayWorkouts(); // Отображаем сохраненные тренировки
//     displayClasses(); // Отображаем сохранённые классы
// }

