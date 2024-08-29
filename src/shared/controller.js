/**
 * @typedef {import('./viewBase.js').default} View
 */
export default class Controller {
  /** @type {View} */
  #view
  /** @param { {view: View} } deps */
  constructor({ view }) {
    this.#view = view
  }
  static init(deps) {
    const controller = new Controller(deps)
    controller.#init()
    return controller
  }

  #isValid(data) {
    return data.name && data.age && data.email
  }

  #onSubmit({ name, age, email }) {
    if (!this.#isValid({ name, age, email })) {
      this.#view.notify({ msg: 'Please, fill out all the fields.' })
      return
    }
    this.#view.resetForm()
    this.#view.addRow({ name, age, email })
  }

  #init() {
    this.#view.configureFormSubmit(this.#onSubmit.bind(this))
    this.#view.configureFormClear()

    const initialData = [
      { name: 'Andrew Tapper', age: '32', email: 'andrew@tapper.codes' },
      { name: 'Andrew Tapper', age: '32', email: 'andrew@tapper.codes' },
      { name: 'Andrew Tapper', age: '32', email: 'andrew@tapper.codes' },
    ]
    this.#view.render(initialData)
  }
}
