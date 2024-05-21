import { decode } from 'js-base64';
import jsonpath from 'jsonpath';
import * as jsonschema from 'jsonschema';
import * as Localization from 'expo-localization';

export const formatTitle = (text) =>
  text
    ?.replace(/(_|-)/g, ' ')
    .trim()
    .replace(/\w\S*/g, function (str) {
      return str.charAt(0).toUpperCase() + str.substr(1);
    })
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');

export const getOOB = (url) => {
  try {
    if (url.includes('oob=')) {
      return decode(url?.split('oob=')[1].split('&')[0]);
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const formatDid = (did) => did?.replace(/:/g, '.');

export const validateSchema = (vc, inputDescriptor) => {
  for (const field of inputDescriptor.constraints.fields) {
    const fieldValues = field.path?.map((path) => {
      return jsonpath.value(vc, path);
    });

    for (const value of fieldValues) {
      if (!value) return false;
      if (field.filter) {
        const { errors } = jsonschema.validate(value, field.filter);
        if (errors.length) {
          return false;
        }
      }
    }
  }
  return true;
};

export const formatField = (vc, field) => {
  if (field) {
    if (field.text) {
      return field.text;
    } else {
      for (const path of field.path) {
        if (path) {
          const value = jsonpath.value(vc, path);
          if (value) {
            if (field.schema?.format === 'date') {
              return new Date(value).toLocaleDateString(
                Localization.locale.slice(0, 2)
              );
            } else {
              return value;
            }
          } else {
            return field.fallback;
          }
        }
      }
    }
  } else {
    return null;
  }
};

export const validateDate = (date) => {
  if (!date) return false;
  return new Date(date) < new Date();
};

export const isImgUrl = (url) => {
  return /\.(jpg|jped|png|webp|gif)$/.test(url)
}