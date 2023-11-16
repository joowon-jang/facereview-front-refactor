import api from "./index";

export const checkEmail = async (props: {
  email_id: string;
  password: string;
}) => {
  try {
    const url = "/gate/login";
    const { data } = await api.get(url, {
      params: { user_id: props.email_id, password: props.password },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signIn = async (props: { email_id: string; password: string }) => {
  try {
    const url = "/gate/login";
    const { data } = await api.post(url, props);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signUp = async (props: { email_id: string; password: string }) => {
  try {
    const url = "/gate/login";
    const { data } = await api.post(url, props);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
