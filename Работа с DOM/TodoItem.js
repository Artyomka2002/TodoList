
class TodoItem {
    constructor(item, onChange, onClick) {
        this.item = item;
        this.onChange = onChange.bind(this);
        this.onClick = onClick.bind(this);
    }
    render() {
        let checkbox = document.createElement('input');
        const numberDiv = document.createElement('div');
        let newList = document.createElement('div');
        const delo = document.createElement('div');
        const buttonTwo = document.createElement('div');
        const asd = document.createElement('div');

        numberDiv.classList.add('number-div')
        newList.classList.add('information-bar');
        delo.classList.add('delo');
        buttonTwo.classList.add('button_two');

        delo.innerHTML = this.item.todo;
        buttonTwo.innerHTML = '&times;';
        asd.style.display = 'flex';

        asd.append(checkbox);
        asd.append(numberDiv);
        asd.append(delo);
        newList.append(asd);
        newList.append(buttonTwo);

        checkbox.type = 'checkbox';
        checkbox.id = 'chech';
        checkbox.name = 'checkbox-name';

        checkbox.checked = this.item.checked
        checkbox.addEventListener('change', this.onChange);
        buttonTwo.addEventListener('click', () => {
            this.onClick()
            // deleteElemenst()
        });
        return newList
    }
}
// modalButtonNo.addEventListener('click', function () {
//     modalSP.style.display = 'none';
// });

            // modalSP.style.display = 'block';     
