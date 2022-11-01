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
import { DataType } from "../../Component/TableAdmin/TableUser";
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

export interface userType {
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
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
export interface courseOfUser {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
}
export interface stateRedux {
  userLogin: Profile;
  arrUser: Profile[] | DataType[];
  userType: userType[];
  arrUserSearch: Profile[] | DataType[];
  listCourseOfUser: courseOfUser[];
  listCoursePendingRegister: courseOfUser[];
  listCourseReigstered: courseOfUser[];
  userToken: any;
}

const initialState: stateRedux = {
  userLogin: getStoreJson(USER_LOGIN) || {},
  userToken: "",
  arrUser: [],
  userType: [],
  arrUserSearch: [],
  listCourseOfUser: [],
  listCoursePendingRegister: [],
  listCourseReigstered: [],
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
    arrUserAction: (state, action: PayloadAction<Profile[]>) => {
      state.arrUser = action.payload;
    },
    getListCourseUnRegisterAction: (
      state,
      action: PayloadAction<courseOfUser[]>
    ) => {
      state.listCourseOfUser = action.payload;
    },
    getListCoursePendingRegisterAction: (
      state,
      action: PayloadAction<courseOfUser[]>
    ) => {
      state.listCoursePendingRegister = action.payload;
    },
    getListCourseRegisteredAction: (
      state,
      action: PayloadAction<courseOfUser[]>
    ) => {
      state.listCourseReigstered = action.payload;
    },
    logoutAction: (state, action: PayloadAction<Profile>) => {
      state.userLogin = action.payload;
    },
  },
});

export const {
  getProfileAction,
  userCheck,
  arrUserAction,
  getListCourseUnRegisterAction,
  getListCoursePendingRegisterAction,
  getListCourseRegisteredAction,
  logoutAction,
} = userReducer.actions;

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

//------------------User-----------------
//get
export const getListUserApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
      dispatch(arrUserAction(result.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//add
export const addUserApi = (data: updateProfile) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/QuanLyNguoiDung/ThemNguoiDung", data);
      message.success("Thêm người dùng thành công");
    } catch (err: any) {
      message.error(err.response.data);
      console.log(err);
    }
  };
};
//delete

export const deleteUserApi = (user: string) => {
  console.log(user);
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(
        `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`
      );
      message.success(result.data);
      dispatch(getListUserApi());
    } catch (err: any) {
      console.log(err);
      message.error(err.response.data);
    }
  };
};
//update
export const updateUserApi = (user: updateProfile) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        user
      );
      message.success("Cập nhật thành công");
      dispatch(getListUserApi());
    } catch (err) {
      console.log(err);
    }
  };
};
//search
export const searchUserApi = (key: string) => {
  console.log(key);
  return async (dispatch: AppDispatch) => {
    try {
      if (key !== "") {
        const result = await http.get(
          "/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=" + key
        );
        dispatch(arrUserAction(result.data));
      } else {
        dispatch(getListUserApi());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//khóa học
//danh sách đã đăng ký
export const getListCourseRegisteredApi = (taiKhoan: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        taiKhoan: taiKhoan,
      };
      let result = await http.post(
        "QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet",
        data
      );
      console.log(result);
      dispatch(getListCourseRegisteredAction(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//lấy danh sách pending đăng ký

export const getListCoursePendingRegisterApi = (taiKhoan: string) => {
  console.log(taiKhoan);
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        taiKhoan: taiKhoan,
      };
      let result = await http.post(
        "QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet",
        data
      );
      console.log(result);
      dispatch(getListCoursePendingRegisterAction(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};
//ghi danh
export const registerCourseApi = (maKhoaHoc: string, taiKhoan: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan,
      };
      let result = await http.post("QuanLyKhoaHoc/GhiDanhKhoaHoc", data);
      console.log(result);
      message.success(result.data);
      dispatch(getListCourseRegisteredApi(taiKhoan));
      dispatch(getListCoursePendingRegisterApi(taiKhoan));
    } catch (err) {
      console.log(err);
    }
  };
};
//hủy đăng ký
export const CancelRegisterCourseApi = (
  maKhoaHoc: string,
  taiKhoan: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan,
      };
      let result = await http.post("QuanLyKhoaHoc/HuyGhiDanh", data);
      console.log(result);
      message.success(result.data);
      dispatch(getListCourseRegisteredApi(taiKhoan));
      dispatch(getListCoursePendingRegisterApi(taiKhoan));
    } catch (err) {
      console.log(err);
    }
  };
};
//chưa ghi danh
export const getListCourseUnRegisterApi = (tenTaiKhoan: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.post(
        "QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=" + tenTaiKhoan
      );
      dispatch(getListCourseUnRegisterAction(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};


