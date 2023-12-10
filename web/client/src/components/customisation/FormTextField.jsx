import { TextField } from '@mui/material';

export const FormTextField = ({
	field,
	formik,
	label,
	type = 'text',
	...props
  }) => (
	<TextField
	  error={!!(formik.touched[field] && formik.errors[field])}
	  fullWidth
	  helperText={formik.touched[field] && formik.errors[field]}
	  label={label}
	  name={field}
	  onBlur={formik.handleBlur}
	  onChange={formik.handleChange}
	  type={type}
	  value={formik.values[field]}
	  variant="filled"
	  {...props}
	/>
  );
