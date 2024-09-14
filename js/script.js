document.addEventListener("DOMContentLoaded", () => {
  // Получаем кнопку "Кодировать" и кнопку "Скопировать"
  const encodeButton = document.querySelector(".button-modal:not(.clipboard)");
  const copyButton = document.querySelector(".button-modal.clipboard");

  // Получаем текстовые поля по классам
  const inputTextArea = document.querySelector(".enter");
  const outputTextArea = document.querySelector(".exit");

  // Ограничиваем ввод данных только буквами латинского алфавита в верхнем регистре
  inputTextArea.addEventListener("input", () => {
    // Удаляем все символы, кроме букв латинского алфавита в верхнем регистре
    inputTextArea.value = inputTextArea.value.replace(/[^A-Z]/g, "");
  });

  // Добавляем обработчик события на кнопку "Кодировать"
  encodeButton.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение кнопки

    // Получаем введенный текст
    const inputText = inputTextArea.value;

    // Выполняем кодирование строки
    const encodedText = encodeString(inputText);

    // Отображаем результат в выходном поле
    outputTextArea.value = encodedText;
  });

  // Добавляем обработчик события на кнопку "Скопировать в буфер обмена"
  copyButton.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение кнопки

    // Получаем текст из выходного текстового поля
    const resultText = outputTextArea.value;

    // Копируем текст в буфер обмена
    navigator.clipboard
      .writeText(resultText)
      .then(() => {
        // Дополнительно можно вывести уведомление или индикацию успешного копирования
        alert("Текст скопирован в буфер обмена!");
      })
      .catch((err) => {
        // Обработка ошибки
        console.error("Ошибка при копировании: ", err);
      });
  });

  // Функция кодирования строки
  function encodeString(str) {
    if (!str) return ""; // Если строка пустая, возвращаем пустую строку

    let encodedStr = "";
    let count = 1;

    for (let i = 0; i < str.length; i++) {
      // Если текущий символ совпадает со следующим, увеличиваем счетчик
      if (str[i] === str[i + 1]) {
        count++;
      } else {
        // Добавляем количество и символ в результирующую строку
        encodedStr += (count > 1 ? count : "") + str[i];
        count = 1; // Сбрасываем счетчик
      }
    }

    return encodedStr;
  }
});
