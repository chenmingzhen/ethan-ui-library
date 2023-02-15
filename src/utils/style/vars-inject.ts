import { exposeClass } from '@/styles/expose'
import { darken, fade } from '../color'
import { set as configSet } from '../../config'
import { entries } from '../objects'
import {
    paginationClass,
    checkInputClass,
    tagClass,
    buttonClass,
    tooltipClass,
    inputClass,
    selectClass,
    formClass,
    sliderClass,
    menuClass,
    alertClass,
    messageClass,
    cardClass,
    modalClass,
    popoverClass,
    datePickerClass,
    dropdownClass,
} from '../../styles'

const computedCache = {}

function getProperty(name = '--btn-hover-darken', cache = true) {
    if (cache && computedCache[name]) return computedCache[name]

    computedCache[name] = getComputedStyle(document.body).getPropertyValue(name).trim()

    return computedCache[name]
}

function setBodyProperty(colors, value) {
    for (const [cssVar, cssValue] of entries(colors)) {
        if (value === undefined) {
            document.body.style.removeProperty(cssVar)
        } else {
            document.body.style.setProperty(cssVar, cssValue)
        }
    }
}

const injects = {
    color: {
        info: {
            title: 'Color 颜色',
            name: 'color',
            path: 'Button',
        },
        conf: [
            {
                name: 'primary',
                type: 'color',
                attr: 'backgroundColor',
                className: buttonClass('primary'),
            },
            {
                name: 'warning',
                type: 'color',
                attr: 'backgroundColor',
                className: buttonClass('warning'),
            },
            {
                name: 'danger',
                type: 'color',
                attr: 'backgroundColor',
                className: buttonClass('danger'),
            },
            {
                name: 'secondary',
                type: 'color',
                attr: 'backgroundColor',
                className: buttonClass('secondary'),
            },
            {
                name: 'success',
                type: 'color',
                attr: 'backgroundColor',
                className: buttonClass('success'),
            },
            {
                name: 'gray100',
                type: 'color',
                attr: 'color',
                className: exposeClass('gray-100'),
            },
            {
                name: 'gray200',
                type: 'color',
                attr: 'color',
                className: exposeClass('gray-200'),
            },
            {
                name: 'gray300',
                type: 'color',
                attr: 'color',
                className: exposeClass('gray-300'),
            },
            {
                name: 'gray400',
                type: 'color',
                attr: 'color',
                className: exposeClass('gray-400'),
            },
            {
                name: 'gray500',
                type: 'color',
                attr: 'color',
                className: exposeClass('gray-500'),
            },
            {
                name: 'gray600',
                type: 'color',
                attr: 'color',
                className: exposeClass('gray-600'),
            },
            {
                name: 'gray700',
                type: 'color',
                attr: 'color',
                className: exposeClass('gray-700'),
            },
            {
                name: 'gray800',
                type: 'color',
                attr: 'color',
                className: exposeClass('gray-800'),
            },
            {
                name: 'gray900',
                type: 'color',
                attr: 'color',
                className: exposeClass('gray-900'),
            },
        ],
        set primary(v) {
            setBodyProperty(
                {
                    '--primary-color': v,
                    '--primary-color-dark-5': darken(v, 5),
                    '--primary-color-dark-15': darken(v, 15),
                    '--primary-color-dark-btn-hover': darken(v, getProperty()),
                    '--primary-color-lighten-40': darken(v, -40),
                    '--primary-color-fade-60': fade(v, 0.6),
                    '--primary-color-fade-50': fade(v, 0.5),
                    '--primary-color-fade-10': fade(v, 0.1),
                    '--primary-color-fade-0': fade(v, 0),
                    '--primary-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
                    '--primary-color-dark-5_fade-0': fade(darken(v, 5), 0),
                },
                v
            )
        },
        set warning(v) {
            setBodyProperty(
                {
                    '--warning-color': v,
                    '--warning-color-dark-5': darken(v, 5),
                    '--warning-color-fade-60': fade(v, 0.6),
                    '--warning-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
                    '--warning-color-fade-0': fade(v, 0),
                    '--warning-color-dark-5_fade-0': fade(darken(v, 5), 0),
                    '--warning-color-dark-btn-hover': darken(v, getProperty()),
                },
                v
            )
        },
        set danger(v) {
            setBodyProperty(
                {
                    '--danger-color': v,
                    '--danger-color-fade-25': fade(v, 0.25),
                    '--danger-color-dark-5': darken(v, 5),
                    '--danger-color-fade-60': fade(v, 0.6),
                    '--danger-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
                    '--danger-color-fade-0': fade(v, 0),
                    '--danger-color-dark-5_fade-0': fade(darken(v, 5), 0),
                    '--danger-color-dark-btn-hover': darken(v, getProperty()),
                },
                v
            )
        },
        set success(v) {
            setBodyProperty(
                {
                    '--success-color': v,
                    '--success-color-dark-5': darken(v, 5),
                    '--success-color-fade-60': fade(v, 0.6),
                    '--success-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
                    '--success-color-fade-0': fade(v, 0),
                    '--success-color-dark-5_fade-0': fade(darken(v, 5), 0),
                    '--success-color-dark-btn-hover': darken(v, getProperty()),
                },
                v
            )
        },
        set secondary(v) {
            setBodyProperty(
                {
                    '--secondary-color': v,
                    '--secondary-color-dark-5': darken(v, 5),
                    '--secondary-color-dark-btn-hover': darken(v, getProperty()),
                    '--secondary-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
                    '--secondary-color-dark-5_fade-0': fade(darken(v, 5), 0),
                },
                v
            )
        },
        set gray100(v) {
            setBodyProperty(
                {
                    '--gray-100': v,
                },
                v
            )
        },
        set gray200(v) {
            setBodyProperty(
                {
                    '--gray-200': v,
                    '--gray-200-darken-5': darken(v, 5),
                },
                v
            )
        },
        set gray300(v) {
            setBodyProperty(
                {
                    '--gray-300': v,
                    '--gray-300-darken-hover': darken(v, getProperty()),
                    '--gray-300-fade-60': fade(v, 0.6),
                    '--gray-300-fade-0': fade(v, 0),
                },
                v
            )
        },
        set gray400(v) {
            setBodyProperty(
                {
                    '--gray-400': v,
                    '--gray-400-darken-20': darken(v, 20),
                },
                v
            )
        },
        set gray500(v) {
            setBodyProperty(
                {
                    '--gray-500': v,
                },
                v
            )
        },
        set gray600(v) {
            setBodyProperty(
                {
                    '--gray-600': v,
                    '--gray-600-lighten-15': darken(v, -15),
                },
                v
            )
        },
        set gray700(v) {
            setBodyProperty(
                {
                    '--gray-700': v,
                },
                v
            )
        },
        set gray800(v) {
            setBodyProperty(
                {
                    '--gray-800': v,
                    '--gray-800-darken-5': darken(v, 5),
                },
                v
            )
        },
        set gray900(v) {
            setBodyProperty(
                {
                    '--gray-900': v,
                    '--gray-900-lighten-40': darken(v, -40),
                },
                v
            )
        },
    },
    button: {
        info: {
            title: 'Button 按钮',
            name: 'button',
            path: 'Button',
        },
        conf: [
            {
                name: 'fontSizeBase',
                attr: 'fontSize',
                type: 'number',
                parser: parseInt,
                className: buttonClass('_'),
            },
            {
                name: 'fontSizeLarge',
                attr: 'fontSize',
                type: 'number',
                parser: parseInt,
                className: buttonClass('large'),
            },
            {
                name: 'fontSizeSmall',
                attr: 'fontSize',
                type: 'number',
                parser: parseInt,
                className: buttonClass('small'),
            },
            {
                name: 'marginLeft',
                attr: 'marginLeft',
                type: 'number',
                parser: parseInt,
                className: exposeClass('button'),
            },
            {
                name: 'spinMargin',
                attr: 'marginRight',
                type: 'number',
                parser: parseInt,
                className: buttonClass('spin'),
            },
            {
                name: 'paddingBaseHorizontal',
                attr: 'paddingLeft',
                type: 'number',
                parser: parseInt,
                className: buttonClass('_'),
            },
            {
                name: 'paddingBaseVertical',
                attr: 'paddingTop',
                type: 'number',
                parser: parseInt,
                className: buttonClass('_'),
            },
            {
                name: 'paddingLargeHorizontal',
                attr: 'paddingLeft',
                type: 'number',
                parser: parseInt,
                className: buttonClass('large'),
            },
            {
                name: 'paddingLargeVertical',
                attr: 'paddingTop',
                type: 'number',
                parser: parseInt,
                className: buttonClass('large'),
            },
            {
                name: 'paddingSmallHorizontal',
                attr: 'paddingLeft',
                type: 'number',
                parser: parseInt,
                className: buttonClass('small'),
            },
            {
                name: 'paddingSmallVertical',
                attr: 'paddingTop',
                type: 'number',
                parser: parseInt,
                className: buttonClass('small'),
            },
            {
                name: 'borderRadius',
                attr: 'borderRadius',
                type: 'number',
                parser: parseInt,
                className: buttonClass('_'),
            },
            {
                name: 'smallBorderRadius',
                attr: 'borderRadius',
                type: 'number',
                parser: parseInt,
                className: buttonClass('small'),
            },
            {
                name: 'largeBorderRadius',
                attr: 'borderRadius',
                type: 'number',
                parser: parseInt,
                className: buttonClass('large'),
            },
            {
                name: 'disabledBg',
                attr: 'backgroundColor',
                type: 'color',
                className: buttonClass('disabled'),
            },
            {
                name: 'disabledBorderColor',
                attr: 'borderColor',
                type: 'color',
                className: buttonClass('disabled'),
            },
            {
                name: 'disabledColor',
                attr: 'color',
                type: 'color',
                className: buttonClass('disabled'),
            },
        ],
        set fontSizeBase(v) {
            setBodyProperty(
                {
                    '--button-font-size-base': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set fontSizeLarge(v) {
            setBodyProperty(
                {
                    '--button-font-size-large': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set fontSizeSmall(v) {
            setBodyProperty(
                {
                    '--button-font-size-small': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set spinMargin(v) {
            setBodyProperty(
                {
                    '--button-spin-margin': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set marginLeft(v) {
            setBodyProperty(
                {
                    '--button-margin-left': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set borderRadius(v) {
            setBodyProperty(
                {
                    '--button-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set smallBorderRadius(v) {
            setBodyProperty(
                {
                    '--button-small-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set largeBorderRadius(v) {
            setBodyProperty(
                {
                    '--button-large-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingBaseHorizontal(v) {
            setBodyProperty(
                {
                    '--button-padding-base-horizontal': `${parseInt(v, 10)}px`,
                    '--button-padding-base-horizontal-7': `${parseInt(v, 10) * 0.7}px`,
                },
                v
            )
        },
        set paddingLargeHorizontal(v) {
            setBodyProperty(
                {
                    '--button-padding-large-horizontal': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingSmallHorizontal(v) {
            setBodyProperty(
                {
                    '--button-padding-small-horizontal': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingBaseVertical(v) {
            setBodyProperty(
                {
                    '--button-padding-base-vertical': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingLargeVertical(v) {
            setBodyProperty(
                {
                    '--button-padding-large-vertical': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingSmallVertical(v) {
            setBodyProperty(
                {
                    '--button-padding-small-vertical': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set disabledBg(v) {
            setBodyProperty(
                {
                    '--button-disabled-bg': v,
                },
                v
            )
        },
        set disabledColor(v) {
            setBodyProperty(
                {
                    '--button-disabled-color': v,
                },
                v
            )
        },
        set disabledBorderColor(v) {
            setBodyProperty(
                {
                    '--button-disabled-border-color': v,
                },
                v
            )
        },
    },
    dropdown: {
        info: {
            title: 'Dropdown 下拉菜单',
            name: 'dropdown',
            path: 'Dropdown',
        },
        conf: [
            {
                name: 'borderWidth',
                attr: 'borderWidth',
                type: 'number',
                parser: parseInt,
                className: exposeClass('dropdown-button'),
            },
            {
                name: 'columnsPadding',
                attr: 'padding',
                type: 'string',
                className: dropdownClass('box-list'),
            },
        ],
        set borderWidth(v) {
            setBodyProperty(
                {
                    '--dropdown-border-width': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set columnsPadding(v) {
            setBodyProperty(
                {
                    '--dropdown-columns-padding': v,
                },
                v
            )
        },
    },
    form: {
        info: {
            title: 'Form 表单',
            name: 'form',
            path: 'Form',
        },
        conf: [
            {
                name: 'itemMarginBottom',
                className: formClass('item'),
                attr: 'marginBottom',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'itemMarginRight',
                className: exposeClass('form-inline'),
                attr: 'marginRight',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'tipColor',
                className: exposeClass('form-tip'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'labelHorizontalAlign',
                className: exposeClass('form-label'),
                attr: 'textAlign',
                type: ['start', 'center', 'end'],
            },
        ],
        set itemMarginBottom(v) {
            setBodyProperty(
                {
                    '--form-item-margin-bottom': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set itemMarginRight(v) {
            setBodyProperty(
                {
                    '--form-item-margin-right': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set tipColor(v) {
            setBodyProperty(
                {
                    '--form-tip-color': v,
                },
                v
            )
        },
        set labelHorizontalAlign(v) {
            setBodyProperty(
                {
                    '--form-item-label-align': v,
                },
                v
            )
        },
    },
    checkbox: {
        info: {
            title: 'Checkbox 复选框',
            name: 'checkbox',
            path: 'Checkbox',
        },
        conf: [
            {
                name: 'marginRight',
                className: checkInputClass('_'),
                attr: 'marginRight',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'borderWidth',
                className: exposeClass('checkbox-indicator'),
                attr: 'width',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'color',
                className: checkInputClass('_'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'borderColor',
                className: exposeClass('checkbox-indicator'),
                attr: 'borderColor',
                type: 'color',
            },
        ],
        set marginRight(v) {
            setBodyProperty(
                {
                    '--checkbox-margin-right': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set color(v) {
            setBodyProperty(
                {
                    '--checkinput-color': v,
                },
                v
            )
        },
        set borderColor(v) {
            setBodyProperty(
                {
                    '--checkbox-border-color': v,
                },
                v
            )
        },
        set borderWidth(v) {
            setBodyProperty(
                {
                    '--checkbox-border-width': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
    },
    radio: {
        info: {
            title: 'Radio 单选框',
            name: 'radio',
            path: 'Radio',
        },
        conf: [
            {
                name: 'size',
                className: exposeClass('radio'),
                attr: 'width',
                type: 'number',
                parser: parseInt,
                min: 0,
                max: 40,
            },
            {
                name: 'borderWidth',
                className: exposeClass('radio'),
                attr: 'borderWidth',
                type: 'number',
                parser: parseInt,
                min: 0,
                max: 10,
            },
            {
                name: 'innerWidth',
                className: exposeClass('radio-inner'),
                attr: 'width',
                type: 'number',
                parser: parseInt,
                min: 0,
                max: 10,
            },
            {
                name: 'uncheckBorderWidth',
                className: exposeClass('radio-uncheck'),
                attr: 'width',
                type: 'number',
                parser: parseInt,
                min: 0,
            },
            {
                name: 'color',
                className: checkInputClass('checkinput-radio-wrap'),
                attr: 'color',
                type: 'color',
            },
        ],
        set size(v) {
            setBodyProperty(
                {
                    '--radio-width': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set borderWidth(v) {
            setBodyProperty(
                {
                    '--radio-border-width': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set innerWidth(v) {
            setBodyProperty(
                {
                    '--radio-inner-width': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set uncheckBorderWidth(v) {
            setBodyProperty(
                {
                    '--radio-border-uncheck-width': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set color(v) {
            setBodyProperty(
                {
                    '--radio-text-color': v,
                },
                v
            )
        },
    },
    input: {
        info: {
            title: 'Input 输入框',
            name: 'input',
            path: 'Input',
        },
        conf: [
            {
                name: 'color',
                className: inputClass('_'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'borderRadius',
                className: inputClass('_'),
                attr: 'borderRadius',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'dropdownBorderRadius',
                className: datePickerClass('picker'),
                attr: 'borderRadius',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'focusWidth',
                className: inputClass('focus'),
                attr: 'boxShadow',
                type: 'number',
                max: 20,
                parser: (v) => parseInt(v.split(' ').pop(), 10),
            },
            {
                name: 'disabledBg',
                className: inputClass('disabled'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'borderColor',
                className: inputClass('_'),
                attr: 'borderColor',
                type: 'color',
            },
            {
                name: 'borderHoverColor',
                className: exposeClass('input-focus'),
                attr: 'borderColor',
                type: 'color',
            },
            {
                name: 'placeholderColor',
                className: exposeClass('input-placeholder'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'placeholderSize',
                className: exposeClass('input-placeholder'),
                attr: 'fontSize',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'clearBg',
                className: exposeClass('input-clear'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'clearHoverBg',
                className: exposeClass('input-clear-hover'),
                attr: 'backgroundColor',
                type: 'color',
            },
        ],
        set color(v) {
            setBodyProperty(
                {
                    '--input-text-color': v,
                },
                v
            )
        },
        set borderRadius(v) {
            setBodyProperty(
                {
                    '--input-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set dropdownBorderRadius(v) {
            setBodyProperty(
                {
                    '--input-dropdown-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set disabledBg(v) {
            setBodyProperty(
                {
                    '--input-bg-disabled': v,
                },
                v
            )
        },
        set borderColor(v) {
            setBodyProperty(
                {
                    '--input-border-color': v,
                },
                v
            )
        },
        set borderHoverColor(v) {
            setBodyProperty(
                {
                    '--input-border-focus-color': v,
                    '--input-border-focus-color-fade-25': fade(v, 0.25),
                },
                v
            )
        },
        set focusWidth(v) {
            setBodyProperty(
                {
                    '--input-focus-width': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set placeholderColor(v) {
            setBodyProperty(
                {
                    '--input-placeholder-color': v,
                },
                v
            )
        },
        set placeholderSize(v) {
            setBodyProperty(
                {
                    '--input-placeholder-size': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set clearBg(v) {
            setBodyProperty(
                {
                    '--input-clear-bg-color': v,
                },
                v
            )
        },
        set clearHoverBg(v) {
            setBodyProperty(
                {
                    '--input-clear-bg-hover-color': v,
                },
                v
            )
        },
    },
    select: {
        info: {
            title: 'Select 选择框',
            name: 'select',
            path: 'Select',
        },
        conf: [
            {
                name: 'resultPaddingHorizontal',
                className: exposeClass('select-result-item'),
                attr: 'paddingLeft',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'resultPaddingVertical',
                className: exposeClass('select-result-item'),
                attr: 'paddingTop',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'itemColor',
                className: selectClass('option'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'itemBgColor',
                className: selectClass('option'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'disabledBg',
                className: selectClass('option', 'disabled'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'disabledColor',
                className: selectClass('option', 'disabled'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'itemActiveBg',
                className: selectClass('active', 'option'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'itemActiveColor',
                className: selectClass('active', 'option'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'itemHoverBg',
                className: exposeClass('select-option-hover'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'itemHoverColor',
                className: exposeClass('select-option-hover'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'compressedMoreHoverBg',
                className: exposeClass('select-compressed'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'clearIconBg',
                className: exposeClass('select-close'),
                attr: 'backgroundColor',
                type: 'color',
            },
        ],
        set resultPaddingVertical(v) {
            setBodyProperty(
                {
                    '--select-result-padding-vertical': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set resultPaddingHorizontal(v) {
            setBodyProperty(
                {
                    '--select-result-padding-horizontal': `${parseInt(v, 10)}px`,
                    '--select-result-padding-horizontal-16': `${parseInt(v, 10) + 16}px`,
                },
                v
            )
        },
        set itemColor(v) {
            setBodyProperty(
                {
                    '--select-option-color': v,
                },
                v
            )
        },
        set itemBgColor(v) {
            setBodyProperty(
                {
                    '--select-option-bg-color': v,
                },
                v
            )
        },
        set disabledBg(v) {
            setBodyProperty(
                {
                    '--select-disabled-bg-color': v,
                },
                v
            )
        },
        set disabledColor(v) {
            setBodyProperty(
                {
                    '--select-disabled-color': v,
                },
                v
            )
        },
        set itemActiveBg(v) {
            setBodyProperty(
                {
                    '--select-item-active-bg': v,
                },
                v
            )
        },
        set itemActiveColor(v) {
            setBodyProperty(
                {
                    '--select-item-active-color': v,
                },
                v
            )
        },
        set itemHoverBg(v) {
            setBodyProperty(
                {
                    '--select-option-hover-bg': v,
                },
                v
            )
        },
        set itemHoverColor(v) {
            setBodyProperty(
                {
                    '--select-option-hover-color': v,
                },
                v
            )
        },
        set compressedMoreHoverBg(v) {
            setBodyProperty(
                {
                    '--select-compressed-hover-bg': v,
                },
                v
            )
        },
        set clearIconBg(v) {
            setBodyProperty(
                {
                    '--select-clear-bg-color': v,
                },
                v
            )
        },
    },
    datepicker: {
        info: {
            title: 'Datepicker 日期选择',
            name: 'datepicker',
            path: 'Datepicker',
        },
        conf: [
            {
                name: 'rectBorderRadius',
                className: exposeClass('datepicker-month-item'),
                attr: 'borderRadius',
                type: 'number',
                parser: parseInt,
            },
        ],
        set rectBorderRadius(v) {
            setBodyProperty(
                {
                    '--datepicker-rect-active-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
    },
    slider: {
        info: {
            title: 'Slider 滑块',
            name: 'slider',
            path: 'Slider',
        },
        conf: [
            {
                name: 'indicatorBg',
                className: exposeClass('slider-indicator'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'indicatorSize',
                className: exposeClass('slider-indicator'),
                attr: 'width',
                type: 'number',
                min: 8,
                max: 40,
                parser: parseInt,
            },
            {
                name: 'indicatorBoxShadow',
                className: exposeClass('slider-indicator'),
                attr: 'boxShadow',
                type: 'string',
            },
            {
                name: 'barBg',
                className: exposeClass('slider-bar'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'disabledBarBg',
                className: exposeClass('slider-bar-disabled'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'disabledIndicatorBorder',
                className: exposeClass('slider-indicator-disabled'),
                attr: 'borderColor',
                type: 'color',
            },
            {
                name: 'disabledIndicatorBg',
                className: exposeClass('slider-indicator-disabled'),
                attr: 'background',
                type: 'color',
            },
            {
                name: 'height',
                className: sliderClass('background'),
                attr: 'height',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'borderRadius',
                className: sliderClass('background'),
                attr: 'borderRadius',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'valueBottom',
                className: exposeClass('slider-value'),
                attr: 'height',
                type: 'number',
                parser: parseInt,
            },
        ],
        set indicatorBg(v) {
            setBodyProperty(
                {
                    '--slider-indicator-bg': v,
                },
                v
            )
        },
        set indicatorSize(v) {
            setBodyProperty(
                {
                    '--slider-indicator-size': `${parseInt(v, 10)}px`,
                    '--slider-indicator-size-half': `${parseInt(v, 10) / 2}px`,
                },
                v
            )
        },
        set indicatorBoxShadow(v) {
            setBodyProperty(
                {
                    '--slider-indicator-box-shadow': v,
                },
                v
            )
        },
        set barBg(v) {
            setBodyProperty(
                {
                    '--slider-bar-color': v,
                },
                v
            )
        },
        set disabledBarBg(v) {
            setBodyProperty(
                {
                    '--slider-disabled-bar-bg': v,
                },
                v
            )
        },
        set disabledIndicatorBorder(v) {
            setBodyProperty(
                {
                    '--slider-disbaled-indicator-border-color': v,
                },
                v
            )
        },
        set disabledIndicatorBg(v) {
            setBodyProperty(
                {
                    '--slider-disbaled-indicator-bg': v,
                },
                v
            )
        },
        set height(v) {
            setBodyProperty(
                {
                    '--slider-bar-height': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set borderRadius(v) {
            setBodyProperty(
                {
                    '--slider-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set valueBottom(v) {
            setBodyProperty(
                {
                    '--slider-value-bottom': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
    },
    pagination: {
        info: {
            title: 'Pagination 分页',
            name: 'pagination',
            path: 'Pagination',
        },
        conf: [
            {
                name: 'borderRadius',
                className: paginationClass('item'),
                attr: 'borderRadius',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'borderWidth',
                className: paginationClass('item'),
                attr: 'borderWidth',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'hoverBorderColor',
                className: exposeClass('pagination-hover'),
                attr: 'borderColor',
                type: 'color',
            },
            {
                name: 'hoverColor',
                className: exposeClass('pagination-hover'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'hoverBg',
                className: exposeClass('pagination-hover'),
                attr: 'backgroundColor',
                type: 'color',
            },
        ],
        set borderRadius(v) {
            setBodyProperty(
                {
                    '--pagination-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set borderWidth(v) {
            setBodyProperty(
                {
                    '--pagination-border-width': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set hoverBorderColor(v) {
            setBodyProperty(
                {
                    '--pagination-hover-border': v,
                },
                v
            )
        },
        set hoverColor(v) {
            setBodyProperty(
                {
                    '--pagination-hover-color': v,
                },
                v
            )
        },
        set hoverBg(v) {
            setBodyProperty(
                {
                    '--pagination-hover-bg': v,
                },
                v
            )
        },
    },
    tag: {
        info: {
            title: 'Tag 标签',
            name: 'tag',
            path: 'Tag',
        },
        conf: [
            {
                name: 'bg',
                className: tagClass('_'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'successBg',
                className: tagClass('success'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'infoBg',
                className: tagClass('info'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'warningBg',
                className: tagClass('warning'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'dangerBg',
                className: tagClass('danger'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'color',
                className: tagClass('_'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'successColor',
                className: tagClass('success'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'infoColor',
                className: tagClass('info'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'warningColor',
                className: tagClass('warning'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'dangerColor',
                className: tagClass('danger'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'borderColor',
                className: tagClass('default'),
                attr: 'borderColor',
                type: 'color',
            },
            {
                name: 'closeColor',
                className: exposeClass('tag-close'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'closeHoverColor',
                className: exposeClass('tag-close-hover'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'borderRadius',
                className: tagClass('_'),
                attr: 'borderRadius',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'paddingHorizontal',
                className: tagClass('_'),
                attr: 'paddingLeft',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'paddingVertical',
                className: tagClass('_'),
                attr: 'paddingTop',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'fontWeight',
                className: tagClass('_'),
                attr: 'fontWeight',
                type: 'number',
                parser: parseInt,
                min: 100,
                max: 900,
            },
        ],
        set bg(v) {
            setBodyProperty(
                {
                    '--tag-bg': v,
                },
                v
            )
        },
        set successBg(v) {
            setBodyProperty({ '--tag-success-bg': v }, v)
        },
        set infoBg(v) {
            setBodyProperty({ '--tag-info-bg': v }, v)
        },
        set warningBg(v) {
            setBodyProperty({ '--tag-warning-bg': v }, v)
        },
        set dangerBg(v) {
            setBodyProperty({ '--tag-danger-bg': v }, v)
        },
        set color(v) {
            setBodyProperty(
                {
                    '--tag-color': v,
                },
                v
            )
        },
        set successColor(v) {
            setBodyProperty({ '--tag-success-color': v }, v)
        },
        set infoColor(v) {
            setBodyProperty({ '--tag-info-color': v }, v)
        },
        set warningColor(v) {
            setBodyProperty({ '--tag-warning-color': v }, v)
        },
        set dangerColor(v) {
            setBodyProperty({ '--tag-danger-color': v }, v)
        },
        set closeColor(v) {
            setBodyProperty(
                {
                    '--tag-close-color': v,
                },
                v
            )
        },
        set closeHoverColor(v) {
            setBodyProperty(
                {
                    '--tag-close-hover-color': v,
                },
                v
            )
        },
        set borderColor(v) {
            setBodyProperty(
                {
                    '--tag-border-color': v,
                },
                v
            )
        },
        set borderRadius(v) {
            setBodyProperty(
                {
                    '--tag-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingHorizontal(v) {
            setBodyProperty(
                {
                    '--tag-padding-horizontal': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingVertical(v) {
            setBodyProperty(
                {
                    '--tag-padding-vertical': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set fontWeight(v) {
            setBodyProperty(
                {
                    '--tag-font-weight': v,
                },
                v
            )
        },
    },
    tooltip: {
        info: {
            title: 'Tooltip 提示',
            name: 'tooltip',
            path: 'Tooltip',
        },
        conf: [
            {
                name: 'bg',
                className: tooltipClass('inner'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'paddingHorizontal',
                className: tooltipClass('inner'),
                attr: 'paddingLeft',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'paddingVertical',
                className: tooltipClass('inner'),
                attr: 'paddingTop',
                type: 'number',
                parser: parseInt,
            },
        ],
        set bg(v) {
            setBodyProperty(
                {
                    '--tooltip-bg': v,
                },
                v
            )
        },
        set paddingHorizontal(v) {
            setBodyProperty(
                {
                    '--tooltip-padding-horizontal': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingVertical(v) {
            setBodyProperty(
                {
                    '--tooltip-padding-vertical': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
    },
    menu: {
        info: {
            title: 'Menu 菜单',
            name: 'menu',
            path: 'Menu',
        },
        conf: [
            {
                name: 'height',
                className: menuClass('title'),
                attr: 'height',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'fontSize',
                className: menuClass('title'),
                attr: 'fontSize',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'darkColor',
                className: exposeClass('menu-dark'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'darkBg',
                className: exposeClass('menu-dark'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'darkActiveBg',
                className: exposeClass('menu-dark-active'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'activeBg',
                className: exposeClass('menu-active'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'activeColor',
                className: exposeClass('menu-active'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'color',
                className: menuClass('title'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'activePaddingHorizontal',
                className: exposeClass('menu-active-horizontal'),
                attr: 'paddingLeft',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'activePaddingVertical',
                className: exposeClass('menu-active-vertical'),
                attr: 'paddingTop',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'activeBorderRadius',
                className: exposeClass('menu-acitive-borderRadius'),
                attr: 'borderRadius',
                type: 'number',
                parser: parseInt,
            },
        ],
        set height(v) {
            const height = parseInt(v, 10)
            setBodyProperty(
                {
                    '--menu-item-height': `${height}px`,
                },
                v
            )
        },
        set fontSize(v) {
            setBodyProperty(
                {
                    '--menu-item-font-size': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set darkBg(v) {
            setBodyProperty(
                {
                    '--menu-dark-bg': v,
                },
                v
            )
        },
        set darkActiveBg(v) {
            setBodyProperty(
                {
                    '--menu-dark-acitve-bg': v,
                },
                v
            )
        },
        set activeBg(v) {
            setBodyProperty(
                {
                    '--menu-item-active-bg': v,
                },
                v
            )
        },
        set activeColor(v) {
            setBodyProperty(
                {
                    '--menu-item-active-color': v,
                },
                v
            )
        },
        set color(v) {
            setBodyProperty(
                {
                    '--menu-item-color': v,
                },
                v
            )
        },
        set darkColor(v) {
            setBodyProperty(
                {
                    '--menu-dark-color': v,
                },
                v
            )
        },
        set activePaddingHorizontal(v) {
            setBodyProperty(
                {
                    '--menu-active-padding-horizontal': `${parseInt(v, 10)}px`,
                    '--menu-active-padding-horizontal-negative': `-${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set activePaddingVertical(v) {
            setBodyProperty(
                {
                    '--menu-active-padding-vertical': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set activeBorderRadius(v) {
            setBodyProperty(
                {
                    '--menu-active-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
    },
    alert: {
        info: {
            title: 'Alert 提示框',
            name: 'alert',
            path: 'Alert',
        },
        conf: [
            {
                name: 'fontSize',
                className: alertClass('_'),
                attr: 'fontSize',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'closeIconColor',
                className: exposeClass('alert-close'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'closeIconHoverColor',
                className: exposeClass('alert-close-hover'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'borderRadius',
                className: alertClass('_'),
                attr: 'borderRadius',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'successBoxShadow',
                className: alertClass('success'),
                attr: 'boxShadow',
                type: 'string',
            },
            {
                name: 'infoBoxShadow',
                className: alertClass('info'),
                attr: 'boxShadow',
                type: 'string',
            },
            {
                name: 'warningBoxShadow',
                className: alertClass('warning'),
                attr: 'boxShadow',
                type: 'string',
            },
            {
                name: 'dangerBoxShadow',
                className: alertClass('danger'),
                attr: 'boxShadow',
                type: 'string',
            },
            {
                name: 'borderWidth',
                className: alertClass('_'),
                attr: 'borderWidth',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'successTextColor',
                className: alertClass('success'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'successBg',
                className: alertClass('success'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'successBorderColor',
                className: alertClass('success'),
                attr: 'borderColor',
                type: 'color',
            },
            {
                name: 'infoTextColor',
                className: alertClass('info'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'infoBg',
                className: alertClass('info'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'infoBorderColor',
                className: alertClass('info'),
                attr: 'borderColor',
                type: 'color',
            },
            {
                name: 'warningTextColor',
                className: alertClass('warning'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'warningBg',
                className: alertClass('warning'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'warningBorderColor',
                className: alertClass('warning'),
                attr: 'borderColor',
                type: 'color',
            },
            {
                name: 'dangerTextColor',
                className: alertClass('danger'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'dangerBg',
                className: alertClass('danger'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'dangerBorderColor',
                className: alertClass('danger'),
                attr: 'borderColor',
                type: 'color',
            },
        ],
        set fontSize(v) {
            setBodyProperty(
                {
                    '--alert-font-size': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set closeIconColor(v) {
            setBodyProperty(
                {
                    '--alert-close-color': v,
                },
                v
            )
        },
        set closeIconHoverColor(v) {
            setBodyProperty(
                {
                    '--alert-close-hover-color': v,
                },
                v
            )
        },
        set borderRadius(v) {
            setBodyProperty(
                {
                    '--alert-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set boxShadow(v) {
            setBodyProperty(
                {
                    '--alert-box-shadow': v,
                },
                v
            )
        },
        set successBoxShadow(v) {
            setBodyProperty(
                {
                    '--alert-success-box-shadow': v,
                },
                v
            )
        },
        set infoBoxShadow(v) {
            setBodyProperty(
                {
                    '--alert-info-box-shadow': v,
                },
                v
            )
        },
        set dangerBoxShadow(v) {
            setBodyProperty(
                {
                    '--alert-danger-box-shadow': v,
                },
                v
            )
        },
        set warningBoxShadow(v) {
            setBodyProperty(
                {
                    '--alert-warning-box-shadow': v,
                },
                v
            )
        },
        set borderWidth(v) {
            setBodyProperty(
                {
                    '--alert-border-width': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set successTextColor(v) {
            setBodyProperty(
                {
                    '--alert-success-text-color': v,
                    '--alert-success-text-darken-10-color': darken(v, 10),
                },
                v
            )
        },
        set successBg(v) {
            setBodyProperty(
                {
                    '--alert-success-bg': v,
                },
                v
            )
        },
        set successBorderColor(v) {
            setBodyProperty(
                {
                    '--alert-success-border-color': v,
                    '--alert-success-border-darken-5-color': darken(v, 5),
                },
                v
            )
        },
        set infoTextColor(v) {
            setBodyProperty(
                {
                    '--alert-info-text-color': v,
                    '--alert-info-text-darken-10-color': darken(v, 10),
                },
                v
            )
        },
        set infoBg(v) {
            setBodyProperty(
                {
                    '--alert-info-bg': v,
                },
                v
            )
        },
        set infoBorderColor(v) {
            setBodyProperty(
                {
                    '--alert-info-border-color': v,
                    '--alert-info-border-darken-5-color': darken(v, 5),
                },
                v
            )
        },
        set warningTextColor(v) {
            setBodyProperty(
                {
                    '--alert-warning-text-color': v,
                    '--alert-warning-text-darken-10-color': darken(v, 10),
                },
                v
            )
        },
        set warningBg(v) {
            setBodyProperty(
                {
                    '--alert-warning-bg': v,
                },
                v
            )
        },
        set warningBorderColor(v) {
            setBodyProperty(
                {
                    '--alert-warning-border-color': v,
                    '--alert-warning-border-darken-5-color': darken(v, 5),
                },
                v
            )
        },
        set dangerTextColor(v) {
            setBodyProperty(
                {
                    '--alert-danger-text-color': v,
                    '--alert-danger-text-darken-10-color': darken(v, 10),
                },
                v
            )
        },
        set dangerBg(v) {
            setBodyProperty(
                {
                    '--alert-danger-bg': v,
                },
                v
            )
        },
        set dangerBorderColor(v) {
            setBodyProperty(
                {
                    '--alert-danger-border-color': v,
                    '--alert-danger-border-darken-5-color': darken(v, 5),
                },
                v
            )
        },
    },
    message: {
        info: {
            title: 'Message 消息提示',
            name: 'message',
            path: 'Message',
        },
        conf: [
            {
                name: 'boxShadow',
                className: messageClass('msg'),
                attr: 'boxShadow',
                type: 'string',
            },
            {
                name: 'closeColor',
                className: exposeClass('msg-close'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'color',
                className: messageClass('msg'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'fontWeight',
                className: messageClass('msg'),
                attr: 'fontWeight',
                type: 'number',
                parser: parseInt,
                max: 900,
                min: 100,
            },
            {
                name: 'borderColor',
                className: messageClass('msg'),
                attr: 'borderColor',
                type: 'color',
            },
        ],
        set boxShadow(v) {
            setBodyProperty(
                {
                    '--message-box-shadow': v,
                },
                v
            )
        },
        set color(v) {
            setBodyProperty(
                {
                    '--message-text-color': v,
                },
                v
            )
        },
        set closeColor(v) {
            setBodyProperty(
                {
                    '--message-close-color': v,
                },
                v
            )
        },
        set fontWeight(v) {
            setBodyProperty(
                {
                    '--message-font-weight': v,
                },
                v
            )
        },
        set borderColor(v) {
            setBodyProperty({ '--message-border-color': v }, v)
        },
    },
    card: {
        info: {
            title: 'Card 卡片',
            name: 'card',
            path: 'Card',
        },
        conf: [
            {
                name: 'fontSize',
                className: cardClass('_'),
                attr: 'fontSize',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'paddingHeaderHorizontal',
                className: cardClass('header'),
                attr: 'paddingLeft',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'paddingHeaderVertical',
                className: cardClass('header'),
                attr: 'paddingTop',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'paddingBodyHorizontal',
                className: cardClass('body'),
                attr: 'paddingLeft',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'paddingBodyVertical',
                className: cardClass('body'),
                attr: 'paddingTop',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'paddingFooterHorizontal',
                className: cardClass('footer'),
                attr: 'paddingLeft',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'paddingFooterVertical',
                className: cardClass('footer'),
                attr: 'paddingTop',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'borderRadius',
                className: cardClass('_'),
                attr: 'borderRadius',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'borderWidth',
                className: cardClass('_'),
                attr: 'borderWidth',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'dividerHeight',
                className: exposeClass('card-divider'),
                attr: 'height',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'dividerWidth',
                value: '100%',
                attr: 'width',
                type: 'string',
            },
            {
                name: 'borderColor',
                className: cardClass('_'),
                attr: 'borderColor',
                type: 'color',
            },
            {
                name: 'dividerColor',
                className: exposeClass('card-divider'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'color',
                className: cardClass('_'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'boxShadow',
                className: cardClass('shadow'),
                attr: 'boxShadow',
                type: 'string',
            },
            {
                name: 'headerBg',
                className: cardClass('header'),
                attr: 'background-color',
                type: 'color',
            },
            {
                name: 'footerBg',
                className: cardClass('footer'),
                attr: 'background-color',
                type: 'color',
            },
            {
                name: 'headerColor',
                className: cardClass('header'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'footerColor',
                className: cardClass('footer'),
                attr: 'color',
                type: 'color',
            },
        ],
        set fontSize(v) {
            setBodyProperty(
                {
                    '--card-font-size': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingHeaderHorizontal(v) {
            setBodyProperty(
                {
                    '--panel-header-padding-horizontal': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingHeaderVertical(v) {
            setBodyProperty(
                {
                    '--panel-header-padding-vertical': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingBodyHorizontal(v) {
            setBodyProperty(
                {
                    '--panel-body-padding-horizontal': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingBodyVertical(v) {
            setBodyProperty(
                {
                    '--panel-body-padding-vertical': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingFooterHorizontal(v) {
            setBodyProperty(
                {
                    '--panel-footer-padding-horizontal': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set paddingFooterVertical(v) {
            setBodyProperty(
                {
                    '--panel-footer-padding-vertical': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set borderRadius(v) {
            setBodyProperty(
                {
                    '--panel-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set borderWidth(v) {
            setBodyProperty(
                {
                    '--card-border-width': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set dividerHeight(v) {
            setBodyProperty(
                {
                    '--card-divider-height': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set dividerWidth(v) {
            setBodyProperty(
                {
                    '--card-divider-width': v,
                },
                v
            )
        },
        set borderColor(v) {
            setBodyProperty(
                {
                    '--card-border-color': v,
                },
                v
            )
        },
        set dividerColor(v) {
            setBodyProperty(
                {
                    '--card-divider-color': v,
                },
                v
            )
        },
        set color(v) {
            setBodyProperty(
                {
                    '--card-color': v,
                },
                v
            )
        },
        set boxShadow(v) {
            setBodyProperty(
                {
                    '--card-box-shadow': v,
                },
                v
            )
        },
        set headerBg(v) {
            setBodyProperty(
                {
                    '--card-header-bg': v,
                },
                v
            )
        },
        set footerBg(v) {
            setBodyProperty(
                {
                    '--card-footer-bg': v,
                },
                v
            )
        },
        set headerColor(v) {
            setBodyProperty(
                {
                    '--card-header-color': v,
                },
                v
            )
        },
        set footerColor(v) {
            setBodyProperty(
                {
                    '--card-footer-color': v,
                },
                v
            )
        },
    },
    modal: {
        info: {
            title: 'Modal 对话框',
            name: 'modal',
            path: 'Modal',
        },
        conf: [
            {
                name: 'titleFontFamily',
                className: modalClass('title'),
                attr: 'fontFamily',
                type: 'string',
            },
            {
                name: 'fontSize',
                className: exposeClass('modal-card'),
                attr: 'fontSize',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'iconSize',
                className: exposeClass('modal-icon'),
                attr: 'width',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'iconTop',
                className: exposeClass('modal-icon'),
                attr: 'marginTop',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'iconLeft',
                className: exposeClass('modal-icon'),
                attr: 'marginLeft',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'closeIconColor',
                className: exposeClass('modal-close'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'closeIconHoverColor',
                className: exposeClass('modal-close-hover'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'closeIconTopMargin',
                className: exposeClass('modal-close'),
                attr: 'marginTop',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'closeIconRightMargin',
                className: exposeClass('modal-close'),
                attr: 'marginRight',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'titleFontSize',
                className: modalClass('title'),
                attr: 'fontSize',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'padding',
                className: modalClass('panel'),
                attr: 'padding',
                type: 'string',
            },
            {
                name: 'headerPadding',
                className: exposeClass('modal-card-header'),
                attr: 'padding',
                type: 'string',
            },
            {
                name: 'bodyPadding',
                className: exposeClass('modal-card-body'),
                attr: 'padding',
                type: 'string',
            },
            {
                name: 'iconBodyPadding',
                className: exposeClass('modal-icon-body'),
                attr: 'padding',
                type: 'string',
            },
            {
                name: 'footerPadding',
                className: exposeClass('modal-card-footer'),
                attr: 'padding',
                type: 'string',
            },
            {
                name: 'borderRadius',
                className: exposeClass('modal-card'),
                attr: 'borderTopLeftRadius',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'borderWidth',
                className: exposeClass('modal-card'),
                attr: 'borderWidth',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'dividerHeight',
                className: exposeClass('modal-divider'),
                attr: 'height',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'dividerWidth',
                value: '100%',
                attr: 'width',
                type: 'string',
            },
            {
                name: 'borderColor',
                className: exposeClass('modal-card'),
                attr: 'borderColor',
                type: 'color',
            },
            {
                name: 'dividerColor',
                className: exposeClass('modal-divider'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'color',
                className: exposeClass('modal-card'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'titleColor',
                className: modalClass('title'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'footerColor',
                className: modalClass('modal-card-footer'),
                attr: 'color',
                type: 'color',
            },
            {
                name: 'headerBg',
                className: exposeClass('modal-card-header'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'footerBg',
                className: exposeClass('modal-card-footer'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'boxShadow',
                className: exposeClass('modal-card'),
                attr: 'boxShadow',
                type: 'string',
            },
        ],
        set titleFontFamily(v) {
            setBodyProperty({ '--modal-title-font': v }, v)
        },
        set fontSize(v) {
            setBodyProperty(
                {
                    '--modal-font-size': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set iconSize(v) {
            setBodyProperty(
                {
                    '--modal-icon-size': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set iconLeft(v) {
            setBodyProperty(
                {
                    '--modal-icon-left': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set iconTop(v) {
            setBodyProperty(
                {
                    '--modal-icon-top': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set closeIconColor(v) {
            setBodyProperty(
                {
                    '--modal-close-icon-color': v,
                },
                v
            )
        },
        set closeIconHoverColor(v) {
            setBodyProperty(
                {
                    '--modal-close-icon-hover-color': v,
                },
                v
            )
        },
        set closeIconTopMargin(v) {
            setBodyProperty(
                {
                    '--modal-close-top-margin': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set closeIconRightMargin(v) {
            setBodyProperty(
                {
                    '--modal-close-right-margin': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set titleFontSize(v) {
            setBodyProperty(
                {
                    '--modal-title-font-size': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set titleColor(v) {
            setBodyProperty(
                {
                    '--modal-title-color': v,
                },
                v
            )
        },
        set padding(v) {
            setBodyProperty(
                {
                    '--modal-panel-padding': v,
                },
                v
            )
        },
        set headerPadding(v) {
            setBodyProperty(
                {
                    '--modal-header-padding': v,
                },
                v
            )
        },
        set bodyPadding(v) {
            setBodyProperty(
                {
                    '--modal-body-padding': v,
                },
                v
            )
        },
        set iconBodyPadding(v) {
            setBodyProperty(
                {
                    '--modal-icon-body-padding': v,
                },
                v
            )
        },
        set footerPadding(v) {
            setBodyProperty(
                {
                    '--modal-footer-padding': v,
                },
                v
            )
        },
        set borderRadius(v) {
            setBodyProperty(
                {
                    '--modal-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set borderWidth(v) {
            setBodyProperty(
                {
                    '--modal-border-width': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set dividerHeight(v) {
            setBodyProperty(
                {
                    '--modal-divider-height': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set dividerWidth(v) {
            setBodyProperty(
                {
                    '--modal-divider-width': v,
                },
                v
            )
        },
        set borderColor(v) {
            setBodyProperty(
                {
                    '--modal-border-color': v,
                },
                v
            )
        },
        set dividerColor(v) {
            setBodyProperty(
                {
                    '--modal-divider-color': v,
                },
                v
            )
        },
        set color(v) {
            setBodyProperty(
                {
                    '--modal-color': v,
                },
                v
            )
        },
        set headerBg(v) {
            setBodyProperty(
                {
                    '--modal-header-bg': v,
                },
                v
            )
        },
        set footerBg(v) {
            setBodyProperty(
                {
                    '--modal-footer-bg': v,
                },
                v
            )
        },
        set boxShadow(v) {
            setBodyProperty(
                {
                    '--modal-box-shadow': v,
                },
                v
            )
        },
    },
    popover: {
        info: {
            title: 'Popover 气泡',
            name: 'popover',
            path: 'Popover',
        },
        conf: [
            {
                name: 'borderColor',
                className: popoverClass('_'),
                attr: 'borderColor',
                type: 'color',
            },
            {
                name: 'borderWidth',
                className: popoverClass('_'),
                attr: 'borderWidth',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'boxShadow',
                className: popoverClass('_'),
                attr: 'boxShadow',
                type: 'string',
            },
            {
                name: 'borderRadius',
                className: popoverClass('_'),
                attr: 'borderRadius',
                type: 'number',
                parser: parseInt,
            },
            {
                name: 'textMaxWidth',
                className: popoverClass('text'),
                attr: 'maxWidth',
                type: 'string',
            },
        ],
        set borderColor(v) {
            setBodyProperty(
                {
                    '--popover-border-color': v,
                },
                v
            )
        },
        set borderWidth(v) {
            setBodyProperty(
                {
                    '--popover-border-width': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set boxShadow(v) {
            setBodyProperty(
                {
                    '--popover-box-shadow': v,
                },
                v
            )
        },
        set borderRadius(v) {
            setBodyProperty(
                {
                    '--popover-border-radius': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set textMaxWidth(v) {
            setBodyProperty(
                {
                    '--popover-text-max-width': v,
                },
                v
            )
        },
    },
    tree: {
        info: {
            title: 'Tree 树型选择',
            name: 'tree',
            path: 'Tree',
        },
        conf: [
            {
                name: 'treeIndicatorColor',
                className: exposeClass('tree-default-icon'),
                attr: 'borderLeftColor',
                type: 'color',
            },
            {
                name: 'levelIndent',
                className: exposeClass('tree-indent'),
                attr: 'width',
                type: 'number',
                parser: parseInt,
                min: -100,
            },
            {
                name: 'nodeMarginBottom',
                className: exposeClass('tree-node'),
                attr: 'marginBottom',
                type: 'number',
                parser: parseInt,
            },
        ],
        set levelIndent(v) {
            setBodyProperty(
                {
                    '--tree-level-indent': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set nodeMarginBottom(v) {
            setBodyProperty(
                {
                    '--tree-node-margin-bottom': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set treeIndicatorColor(v) {
            setBodyProperty(
                {
                    '--tree-indicator-color': v,
                },
                v
            )
        },
    },
    switch: {
        info: {
            title: 'Switch 开关选择器',
            name: 'switch',
            path: 'Switch',
        },
        conf: [
            {
                name: 'uncheckBg',
                className: checkInputClass('switch'),
                attr: 'backgroundColor',
                type: 'color',
            },
            {
                name: 'type',
                className: exposeClass('switch-type'),
                attr: 'animationName',
                type: ['outter', 'inner'],
            },
        ],
        set type(v) {
            const o = {}
            if (v === 'outter') {
                o['--switch-indicator-padding-horizontal'] = '0px'
                o['--switch-indicator-padding-horizontal-negative'] = '0px'
                o['--switch-indicator-size'] = '24px'
                o['--switch-bg-height'] = '16px'
                o['--switch-indicator-top'] = '-4px'
                o['--switch-small-indicator-size'] = '16px'
                o['--switch-small-bg-height'] = '10px'
                o['--switch-large-bg-height'] = '22px'
                o['--switch-large-indicator-top'] = '-5px'
                o['--switch-small-indicator-top'] = '-3px'
                o['--switch-large-indicator-size'] = '32px'
            } else if (v === 'inner') {
                o['--switch-indicator-checked-bg'] = '#fff'
                o['--switch-indicator-padding-horizontal'] = '2px'
                o['--switch-indicator-padding-horizontal-negative'] = '-2px'
                o['--switch-indicator-size'] = '18px'
                o['--switch-bg-height'] = '22px'
                o['--switch-indicator-top'] = '2px'
                o['--switch-small-indicator-size'] = '12px'
                o['--switch-small-bg-height'] = '16px'
                o['--switch-large-bg-height'] = '28px'
                o['--switch-large-indicator-top'] = '2px'
                o['--switch-small-indicator-top'] = '2px'
                o['--switch-large-indicator-size'] = '24px'
            }
            setBodyProperty(o, v)
        },
        set uncheckBg(v) {
            setBodyProperty(
                {
                    '--switch-unchecked-bg': v,
                },
                v
            )
        },
    },
    common: {
        info: {
            title: 'Common 公共',
            name: 'common',
            path: 'Button',
        },
        conf: [
            {
                name: 'fontSize',
                className: buttonClass('_'),
                attr: 'fontSize',
                parser: parseInt,
                type: 'number',
            },
            {
                name: 'fontFamily',
                className: buttonClass('_'),
                attr: 'fontFamily',
                type: 'string',
            },
            {
                name: 'lineHeight',
                className: exposeClass('common-line-height'),
                attr: 'flexGrow',
                type: 'string',
            },
            {
                name: 'contentBlockPadding',
                className: '',
                attr: 'padding',
                type: 'string',
            },
            {
                name: 'contentTextPadding',
                className: popoverClass('text'),
                attr: 'padding',
                type: 'string',
            },
            {
                name: 'spinDefaultName',
                className: exposeClass('common-spin-default'),
                attr: 'animationName',
                type: [
                    'default',
                    'chasing-dots',
                    'cube-grid',
                    'double-bounce',
                    'fading-circle',
                    'four-dots',
                    'plane',
                    'pulse',
                    'ring',
                    'scale-circle',
                    'three-bounce',
                    'wave',
                ],
            },
            {
                name: 'caret',
                className: exposeClass('common-caret'),
                attr: 'animationName',
                type: ['line', 'fill'],
            },
            {
                name: 'inputDelay',
                className: exposeClass('common-input-delay'),
                attr: 'width',
                type: 'number',
                parser: parseInt,
                min: 0,
                max: 2000,
            },
            {
                name: 'inputTrim',
                className: exposeClass('common-input-trim'),
                attr: 'opacity',
                type: 'number',
                parser: parseInt,
                min: 0,
                max: 1,
            },
        ],
        set fontSize(v) {
            const base = parseInt(v, 10)
            setBodyProperty(
                {
                    '--font-size-base': `${base}px`,
                    '--font-size-base-26': `${Math.floor(base * 2.6)}px`,
                    '--font-size-base-215': `${Math.floor(base * 2.15)}px`,
                    '--font-size-base-17': `${Math.floor(base * 1.7)}px`,
                    '--font-size-base-125': `${Math.floor(base * 1.25)}px`,
                    '--font-size-base-085': `${Math.floor(base * 0.85)}px`,
                    '--font-size-base-15': `${Math.floor(base * 1.5)}px`,
                    '--font-size-base-45': `${Math.floor(base * 4.5)}px`,
                    '--font-size-large': `${Math.ceil(base * 1.25)}px`,
                    '--font-size-small': `${Math.ceil(base * 0.85)}px`,
                    '--font-size-large-medium': `${base + 2}px`,
                },
                v
            )
        },
        set fontFamily(v) {
            setBodyProperty(
                {
                    '--common-body-font-family': v,
                },
                v
            )
        },
        set lineHeight(v) {
            setBodyProperty(
                {
                    '--common-line-height': v,
                },
                v
            )
        },
        set contentBlockPadding(v) {
            setBodyProperty(
                {
                    '--common-content-block-padding': v,
                },
                v
            )
        },
        set contentTextPadding(v) {
            setBodyProperty(
                {
                    '--common-content-text-padding': v,
                },
                v
            )
        },
        set caret(v) {
            configSet('caret', v)
            setBodyProperty(
                {
                    '--common-caret-style': v,
                },
                v
            )
        },
        set inputDelay(v) {
            configSet('delay', v)
            setBodyProperty(
                {
                    '--common-input-delay': `${parseInt(v, 10)}px`,
                },
                v
            )
        },
        set inputTrim(v) {
            configSet('trim', !!v)
            setBodyProperty(
                {
                    '--common-input-trim': parseInt(v, 10),
                },
                v
            )
        },
        set spinDefaultName(v) {
            configSet('spin', v)
            setBodyProperty(
                {
                    '--common-spin-default-name': v,
                },
                v
            )
        },
    },
}

export default injects
