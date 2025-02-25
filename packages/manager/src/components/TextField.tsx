import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Theme, useTheme } from '@mui/material/styles';
import {
  default as _TextField,
  StandardTextFieldProps,
} from '@mui/material/TextField';
import { clamp } from 'ramda';
import * as React from 'react';
import { makeStyles } from 'tss-react/mui';

import { Box } from 'src/components/Box';
import { CircleProgress } from 'src/components/CircleProgress';
import { FormHelperText } from 'src/components/FormHelperText';
import { InputAdornment } from 'src/components/InputAdornment';
import { InputLabel } from 'src/components/InputLabel';
import { TooltipProps } from 'src/components/Tooltip';
import { TooltipIcon } from 'src/components/TooltipIcon';
import { convertToKebabCase } from 'src/utilities/convertToKebobCase';

import type { BoxProps } from 'src/components/Box';

const useStyles = makeStyles()((theme: Theme) => ({
  absolute: {
    position: 'absolute',
  },
  editable: {
    paddingLeft: 1,
    wordBreak: 'keep-all',
  },
  errorText: {
    alignItems: 'center',
    color: theme.color.red,
    display: 'flex',
    left: 5,
    top: 42,
    width: '100%',
  },
  expand: {
    maxWidth: '100%',
  },
  helpWrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flexWrap: 'wrap',
  },
  helpWrapperContainer: {
    display: 'flex',
    width: '100%',
  },
  helpWrapperTextField: {
    width: '415px',
  },
  helperTextTop: {
    marginBottom: theme.spacing(),
    marginTop: theme.spacing(),
  },
  label: {
    fontFamily: theme.font.normal,
  },
  noTransform: {
    transform: 'none',
  },
  root: {
    marginTop: 0,
  },
}));

interface BaseProps {
  /**
   * className to apply to the underlying TextField component
   */
  className?: string;
  /**
   * Props applied to the root element
   */
  containerProps?: BoxProps;
  /**
   * Data attributes are applied to the underlying TextField component for testing purposes
   */
  dataAttrs?: Record<string, any>;
  /**
   * Applies editable styles
   * @default false
   */
  editable?: boolean;
  /**
   * Adds error grouping to TextField
   */
  errorGroup?: string;
  /**
   * When defined, makes the input show an error state with the defined text
   */
  errorText?: string;
  /**
   * Makes the TextField use 100% of the available width
   * @default false
   */
  expand?: boolean;
  /**
   * Makes the error text have the absolute positioning
   * @default false
   */
  hasAbsoluteError?: boolean;
  /**
   * Placement of the `helperText`
   * @default bottom
   */
  helperTextPosition?: 'bottom' | 'top';
  /**
   * Hides the `label`
   * @default false
   */
  hideLabel?: boolean;
  /**
   * Allows you to manually set an htmlFor input id. One will automatically be generated by the `label` if this is unset
   */
  inputId?: string;
  /**
   * Displays a loading spinner at the end of the Text Field
   * @default false
   */
  loading?: boolean;
  /**
   * The maximum number allowed in TextField. The "type" prop must also be set to `number`
   */
  max?: number;
  /**
   * The minimum number allowed in TextField. The "type" prop must also be set to `number`
   */
  min?: number;
  /**
   * Removes the default top margin (16px)
   * @default false
   */
  noMarginTop?: boolean;
  /**
   * Adds `(optional)` to the Label
   * @default false
   */
  optional?: boolean;
  /**
   * Adds `(required)` to the Label
   */
  required?: boolean;
  /**
   * The leading and trailing spacing should be trimmed from the textfield on blur; intended to be used for username, emails, and SSH key input only
   */
  trimmed?: boolean;
  value?: Value;
}

type Value = null | number | string | undefined;

interface LabelToolTipProps {
  labelTooltipText?: JSX.Element | string;
}

interface InputToolTipProps {
  tooltipClasses?: string;
  tooltipOnMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  tooltipPosition?: TooltipProps['placement'];
  tooltipText?: JSX.Element | string;
}

interface TextFieldPropsOverrides extends StandardTextFieldProps {
  // We override this prop to make it required
  label: string;
}

export type TextFieldProps = BaseProps &
  TextFieldPropsOverrides &
  LabelToolTipProps &
  InputToolTipProps;

/**
### Overview

Text fields allow users to enter text into a UI.

### Usage

- Input fields should be sized to the data being entered (ex. the entry for a street address should be wider than a zip code).
- Ensure that the field can accommodate at least one more character than the maximum number to be entered.

### Rules

- Every input must have a descriptive label of what that field is.
- Required fields should include the text “(Required)” as part of the input label.
- If most fields are required, then indicate the optional fields with the text “(Optional)” instead.
- Avoid long labels; use succinct, short and descriptive labels (a word or two) so users can quickly scan your form. <br/> Label text shouldn’t take up multiple lines.
- Placeholder text is the text that users see before they interact with a field. It should be a useful guide to the input type and format <br/> Don’t make the user guess what format they should use for the field. Tell this information up front.

### Best Practices

- A single column form with input fields stacked sequentially is the easiest to understand and leads to the highest success rate. Input fields in multiple columns can be overlooked or add unnecessary visual clutter.
- Grouping related inputs (ex. mailing address) under a subhead or rule can add meaning and make the form feel more manageable.
- Avoid breaking a single form into multiple “papers” unless those sections are truly independent of each other.
- Consider sizing the input field to the data being entered (ex. the field for a street address should be wider than the field for a zip code). Balance this goal with the visual benefits of fields of the same length. A somewhat outsized input that aligns with the fields above and below it might be the best choice.

## Textfield errors

### Overview

Error messages are an indicator of system status: they let users know that a hurdle was encountered and give solutions to fix it. Users should not have to memorize instructions in order to fix the error.

### Main Principles

- Should be easy to notice and understand.
- Should give solutions to how to fix the error.
- Users should not have to memorize instructions in order to fix the error.
- Long error messages for short text fields can extend beyond the text field.
- When the user has finished filling in a field and clicks the submit button, an indicator should appear if the field contains an error. Use red to differentiate error fields from normal ones.

## Number Text Fields

### Overview

Number Text Fields are used for strictly numerical input
 */
export const TextField = (props: TextFieldProps) => {
  const { classes, cx } = useStyles();

  const {
    InputLabelProps,
    InputProps,
    SelectProps,
    children,
    className,
    containerProps,
    dataAttrs,
    editable,
    error,
    errorGroup,
    errorText,
    expand,
    hasAbsoluteError,
    helperText,
    helperTextPosition,
    hideLabel,
    inputId,
    inputProps,
    label,
    labelTooltipText,
    loading,
    max,
    min,
    noMarginTop,
    onBlur,
    onChange,
    optional,
    required,
    tooltipClasses,
    tooltipOnMouseEnter,
    tooltipPosition,
    tooltipText,
    trimmed,
    type,
    value,
    ...textFieldProps
  } = props;

  const [_value, setValue] = React.useState<Value>(value);
  const theme = useTheme();

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (trimmed) {
      const trimmedValue = e.target.value.trim();
      e.target.value = trimmedValue;
      setValue(trimmedValue);
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberTypes = ['tel', 'number'];

    // Because !!0 is falsy :(
    const minAndMaxExist = typeof min === 'number' && typeof max === 'number';

    /**
     * If we've provided a min and max value, make sure the user
     * input doesn't go outside of those bounds ONLY if the input
     * type matches a number type.
     */
    const cleanedValue =
      minAndMaxExist &&
      numberTypes.some((eachType) => eachType === type) &&
      e.target.value !== ''
        ? clamp(min, max, +e.target.value)
        : e.target.value;

    /**
     * If the cleanedValue is undefined, set the value to an empty
     * string but this shouldn't happen.
     */
    setValue(cleanedValue || '');

    // Invoke the onChange prop if one is provided with the cleaned value.
    if (onChange) {
      /**
       * Create clone of event node only if our cleanedValue
       * is different from the e.target.value
       *
       * This solves for a specific scenario where the e.target on
       * the MUI TextField select variants were actually a plain object
       * rather than a DOM node.
       *
       * So e.target on a text field === <input />
       * while e.target on the select variant === { value: 10, name: undefined }
       *
       * See GitHub issue: https://github.com/mui-org/material-ui/issues/16470
       */
      if (e.target.value !== cleanedValue) {
        const clonedEvent = {
          ...e,
          target: e.target.cloneNode(),
        } as React.ChangeEvent<HTMLInputElement>;

        clonedEvent.target.value = `${cleanedValue}`;
        onChange(clonedEvent);
      } else {
        onChange(e);
      }
    }
  };

  let errorScrollClassName = '';

  if (errorText) {
    errorScrollClassName = errorGroup
      ? `error-for-scroll-${errorGroup}`
      : `error-for-scroll`;
  }

  const validInputId =
    inputId || (label ? convertToKebabCase(`${label}`) : undefined);

  return (
    <Box
      {...containerProps}
      className={cx(
        {
          [classes.helpWrapper]: Boolean(tooltipText),
          [errorScrollClassName]: !!errorText,
        },
        containerProps?.className
      )}
    >
      <Box
        className={cx({
          'visually-hidden': hideLabel,
        })}
        sx={{
          marginBottom: theme.spacing(1),
          ...(!noMarginTop && { marginTop: theme.spacing(2) }),
        }}
        alignItems={'center'}
        data-testid="inputLabelWrapper"
        display="flex"
      >
        <InputLabel
          className={cx({
            [classes.noTransform]: true,
          })}
          sx={{
            marginBottom: 0,
          }}
          data-qa-textfield-label={label}
          htmlFor={validInputId}
        >
          {label}
          {required ? (
            <span className={classes.label}> (required)</span>
          ) : optional ? (
            <span className={classes.label}> (optional)</span>
          ) : null}
        </InputLabel>
        {labelTooltipText && (
          <TooltipIcon
            sxTooltipIcon={{
              marginLeft: `${theme.spacing(0.5)}`,
              padding: `${theme.spacing(0.5)}`,
            }}
            status="help"
            text={labelTooltipText}
          />
        )}
      </Box>

      {helperText && helperTextPosition === 'top' && (
        <FormHelperText
          className={classes.helperTextTop}
          data-qa-textfield-helper-text
        >
          {helperText}
        </FormHelperText>
      )}
      <div
        className={cx({
          [classes.helpWrapperContainer]: Boolean(tooltipText),
        })}
      >
        <_TextField
          {...textFieldProps}
          {...dataAttrs}
          InputLabelProps={{
            ...InputLabelProps,
            required: false,
            shrink: true,
          }}
          InputProps={{
            className: cx(
              'input',
              {
                [classes.expand]: expand,
              },
              className
            ),
            disableUnderline: true,
            endAdornment: loading && (
              <InputAdornment position="end">
                <CircleProgress mini />
              </InputAdornment>
            ),
            ...InputProps,
          }}
          SelectProps={{
            IconComponent: KeyboardArrowDown,
            MenuProps: {
              MenuListProps: { className: 'selectMenuList' },
              PaperProps: { className: 'selectMenuDropdown' },
              anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
              transformOrigin: { horizontal: 'left', vertical: 'top' },
            },
            disableUnderline: true,
            ...SelectProps,
          }}
          className={cx(
            {
              [classes.helpWrapperTextField]: Boolean(tooltipText),
              [classes.root]: true,
            },
            className
          )}
          inputProps={{
            'data-testid': 'textfield-input',
            id: validInputId,
            ...inputProps,
          }}
          error={!!error || !!errorText}
          fullWidth
          helperText={''}
          /**
           * Set _helperText_ and _label_ to no value because we want to
           * have the ability to put the helper text under the label at the top.
           */
          label={''}
          onBlur={handleBlur}
          onChange={handleChange}
          type={type}
          /*
           * Let us explicitly pass an empty string to the input
           * See UserDefinedFieldsPanel.tsx for a verbose explanation why.
           */
          value={_value}
          variant="standard"
        >
          {children}
        </_TextField>
        {tooltipText && (
          <TooltipIcon
            sxTooltipIcon={{
              margin: '0px 0px 0px 4px',
              padding: '6px',
            }}
            classes={{ popper: tooltipClasses }}
            onMouseEnter={tooltipOnMouseEnter}
            status="help"
            text={tooltipText}
            tooltipPosition={tooltipPosition}
          />
        )}
      </div>
      {errorText && (
        <FormHelperText
          className={cx({
            [classes.absolute]: editable || hasAbsoluteError,
            [classes.editable]: editable,
            [classes.errorText]: true,
          })}
          data-qa-textfield-error-text={label}
          role="alert"
        >
          {errorText}
        </FormHelperText>
      )}
      {helperText &&
        (helperTextPosition === 'bottom' || !helperTextPosition) && (
          <FormHelperText data-qa-textfield-helper-text>
            {helperText}
          </FormHelperText>
        )}
    </Box>
  );
};
