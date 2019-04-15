const NAME_VALUE_SEPARATOR = '=';

class CustomField {
  constructor(name, value) {
    if (!name) {
      throw new Error("parameter name is missing in CustomField constructor");
    }

    this.name = name;
    this.value = value;
  }

  toString() {
    return this.name + NAME_VALUE_SEPARATOR + this.value;
  }

  toMapItem() {
    return [this.name, this];
  }
}

module.exports = CustomField;
