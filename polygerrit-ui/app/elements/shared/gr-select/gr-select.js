/**
 * @license
 * Copyright (C) 2016 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import {LegacyElementMixin} from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

/**
 * @extends PolymerElement
 */
class GrSelect extends GestureEventListeners(
    LegacyElementMixin(PolymerElement)) {
  static get is() { return 'gr-select'; }

  static get template() {
    return html`
      <slot></slot>
    `;
  }

  static get properties() {
    return {
      bindValue: {
        type: String,
        notify: true,
        observer: '_updateValue',
      },
    };
  }

  get nativeSelect() {
    // gr-select is not a shadow component
    // TODO(taoalpha): maybe we should convert
    // it into a shadow dom component instead
    return this.querySelector('select');
  }

  _updateValue() {
    // It's possible to have a value of 0.
    if (this.bindValue !== undefined) {
      // Set for chrome/safari so it happens instantly
      this.nativeSelect.value = this.bindValue;
      // Async needed for firefox to populate value. It was trying to do it
      // before options from a dom-repeat were rendered previously.
      // See https://bugs.chromium.org/p/gerrit/issues/detail?id=7735
      this.async(() => {
        this.nativeSelect.value = this.bindValue;
      }, 1);
    }
  }

  _valueChanged() {
    this.bindValue = this.nativeSelect.value;
  }

  focus() {
    this.nativeSelect.focus();
  }

  /** @override */
  created() {
    super.created();
    this.addEventListener('change',
        () => this._valueChanged());
    this.addEventListener('dom-change',
        () => this._updateValue());
  }

  /** @override */
  ready() {
    super.ready();
    // If not set via the property, set bind-value to the element value.
    if (this.bindValue == undefined && this.nativeSelect.options.length > 0) {
      this.bindValue = this.nativeSelect.value;
    }
  }
}

customElements.define(GrSelect.is, GrSelect);
