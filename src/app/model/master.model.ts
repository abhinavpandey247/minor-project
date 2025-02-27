

export interface IApiResponse{
    message:string,
    result:boolean,
    data:any
}

export class Login{
    userName:string
    password:string

    constructor(){
        this.password='';
        this.userName='';
    }
}

export class User{
    userId: number
    userName:string
    emailId: string
    fullName: string
    role: string
    createdDate: Date
    password: string
    projectName: string
    refreshToken: string
    refreshTokenExpiryTime: string

    constructor(){
        this.createdDate=new Date();
        this.emailId='';
        this.fullName='';
        this.password='';
        this.projectName='';
        this.refreshToken='';
        this.refreshTokenExpiryTime='';
        this.role='';
        this.userId=0;
        this.userName='';
    }
}

export class userlist{
    videoId:number
    videoUrl:string
    videoTitle:string
    videoDescription:string
    videoThumbnail:string
    totalDuration:string

    constructor(){
        this.videoId=0;
        this.videoUrl="";
        this.videoTitle="";
        this.videoDescription="";
        this.videoThumbnail="";
        this.totalDuration="";
    }
}

export interface Icourse{
    courseId:number,
    courseName:string,
    courseDate:string,
    totalHours:string,
    totalVideos:number,
    courseDescription:string,
    thumbnailUrl:string,
}

export interface ICourseWithVideos{
    courseId:number,
    courseName:string,
    createdDate:string,
    totalHours:string,
    totalVideos:number,
    courseDescription:string,
    lmsCourseVideos:{
        courseVideoId:number,
        courseId:number,
        videoId:number,
    }
}

export interface IcourseVideos{
    courseVideoId:number
    courseName:string
    courseId:number
    videoTitle:string
    videoId:number
    videoUrl:string   
}

export class IEnrollment{ 
  enrollmentId: number  
  userId: number
  courseId: number
  enrolledDate: Date
  isCompleted: boolean

  constructor(){
    this.enrollmentId=0;
    this.courseId=0;
    this.enrolledDate=new Date();
    this.isCompleted=false;
    this.userId=0;
  }
}

export interface IEnrollmentCourse{
    courseId:number
    enrolledDate:string
    enrollmentId:number
    isCompleted:boolean
    userId:number
    courseName:string
    thumbnailUrl:string
    courseDescription:string
}