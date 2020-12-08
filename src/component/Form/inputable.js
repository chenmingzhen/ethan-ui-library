import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { Component } from '@/utils/component'
import { promiseAll, isSameError } from '@/utils/errors'
import shadowEqual from '@/utils/shallowEqual'
import { curry, compose } from '@/utils/func'
import { filterProps } from '@/utils/objects'
import { getUidStr } from '@/utils/uid'
import { isArray } from '@/utils/is'
import { FORCE_PASS, ERROR_TYPE, IGNORE_VALIDATE, errorSubscribe, IGNORE_BIND } from '@/utils/Datum/types'
import { itemConsumer } from '@/component/Form/Item'
import { formConsumer } from './formContext'
import { loopConsumer } from './Loop'
import { fieldSetConsumer } from './FieldSet'
