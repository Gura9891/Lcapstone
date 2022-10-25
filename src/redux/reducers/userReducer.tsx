import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  ACCESS_TOKEN,
  getStoreJson,
  http,
  setCookie,
  setStore,
  setStoreJson,
  USER_LOGIN,
} from "../../util/setting";
import { AppDispatch } from "../configStore";
import { history } from "../../index";
import { string } from "yup";
export interface UserRegister {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
  passConfirm: string;
}

export interface userLogin {
  taiKhoan: string;
  matKhau: string;
}

export interface Profile {
  chiTietKhoaHocGhiDanh: ChiTietKhoaHocGhiDanh[];
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}
export interface updateProfile {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  email: string;
  maLoaiNguoiDung: string;
  maNhom: string;
}

export interface ChiTietKhoaHocGhiDanh {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  ngayTao: Date;
  danhGia: number;
}

export interface stateRedux {
  userLogin: Profile;
  userToken: any;
}

const initialState: any = {
  userLogin: {},
  userToken: "",
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action: PayloadAction<Profile>) => {
      state.userLogin = action.payload;
    },
    userCheck: (state, action: PayloadAction<Profile>) => {
      state.userToken = action.payload;
    },
  },
});

export const { getProfileAction, userCheck } = userReducer.actions;

export default userReducer.reducer;

//API

export const registerApi = (userRes: UserRegister) => {
  return async () => {
    try {
      const result = await http.post("/QuanLyNguoiDung/DangKy", userRes);
      const key = "updatable";
      const Mess = () => {
        message.loading({ content: "Vui lòng chờ", key });
        setTimeout(() => {
          message.success({ content: "Đăng ký thành công!", key, duration: 2 });
        }, 1000);
      };
      Mess();
      history.push("/login");
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
};

export const LoginApi = (userLogin: userLogin) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result: any = await http.post(
        "/QuanLyNguoiDung/DangNhap",
        userLogin
      );
      console.log(result);
      setCookie(ACCESS_TOKEN, result.data.accessToken, 30);
      setStore(ACCESS_TOKEN, result.data.accessToken);
      dispatch(userCheck(result.data.accessToken));
      dispatch(getProfileApi());
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProfileApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/QuanLyNguoiDung/ThongTinNguoiDung");
      console.log(result);
      const action = getProfileAction(result.data);
      dispatch(action);
      setStoreJson(USER_LOGIN, result.data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProfileApi = (userUpdate: updateProfile) => {
  return async () => {
    try {
      const result = await http.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        userUpdate
      );
      const key = "updatable";
      const openMessage = () => {
        message.loading({ content: "Đang kiểm tra", key });
        setTimeout(() => {
          message.success({
            content: "Cập nhật thành công!",
            key,
            duration: 2,
          });
        }, 1000);
      };
      openMessage();
    } catch (err) {
      console.log(err);
    }
  };
};
