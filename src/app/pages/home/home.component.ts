import { Component,ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master.service';

import { IApiResponse, Icourse, IcourseVideos, IEnrollment, User } from '../../model/master.model';
import { SlicePipe, CommonModule} from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import Razorpay from 'razorpay';
import Swal from 'sweetalert2'

// Define Razorpay interface
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

@Component({
  selector: 'app-home',
  imports: [SlicePipe,RouterLink,RouterOutlet,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  @ViewChild('feedbackModal') feedbackModal: ElementRef | undefined;

  feedback = {
    name: '',
    email: '',
    phone: '',
    message: '',
    rating: 0
  };
  stars: number[] = [1, 2, 3, 4, 5];
  starColors: string[] = ['red', 'orange', 'yellow', 'lightgreen', 'green'];
 
  rate(star: number) {
    this.feedback.rating = star;
  }
  getStarColor(index: number): string {
    if (index < this.feedback.rating) {
      return this.starColors[this.feedback.rating - 1];
    }
    return 'gray';
  }
 
  masterSrv=inject(MasterService)
  courseList=signal<Icourse[]>([])
  courseVideos:IcourseVideos[]=[]
  storageService = inject(StorageService);
  @ViewChild('courseModal') modal: ElementRef | undefined;

  loggedUserData:User=new User;
  ngOnInit(): void {
        const localData = this.storageService.getItem('learningUser');
        if (localData != null) {
          const parseData = JSON.parse(localData);
          this.loggedUserData = parseData;
        }
    this.loadCourses();
  }
  
  
  onEnroll(courseId:number){
    if(this.loggedUserData.userId==0){
      Swal.fire({   title: "Please Login First To Enroll",   text: "You clicked the button!",   icon: "warning"});
    }
    else{
      
      const enrolObj:IEnrollment={
        courseId:courseId,
        enrolledDate:new Date(),
        enrollmentId:0,
        userId:this.loggedUserData.userId,
        isCompleted:false
      };
      this.masterSrv.onEnrollment(enrolObj).subscribe((res: IApiResponse) => {
        if (res.result) {
          this.openPaymentModal(courseId);
        } else {
          Swal.fire({   title: res.message,   text: "You clicked the button!",   icon: "warning"});
          
        }
      });
    }
  }

  openPaymentModal(courseId: number) {
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
      paymentModal.style.display = 'block';
    }

    const options: RazorpayOptions = {
      key: 'rzp_test_vjLf04gKoeGSUr', 
      amount: 50000, 
      currency: 'INR',
      name: 'CourseHub',
      description: 'Course Enrollment',
      image: 'https://example.com/your_logo',
      order_id: '',  
      handler: (response: any) => {
        Swal.fire({   title: response.message,   text: "Payment Succesfull!",   icon: "success"});
        this.closePaymentModal();
      },
      prefill: {
        name: this.loggedUserData.userName,
        email: this.loggedUserData.emailId,
        contact: '9999999999'
      },
      notes: {
        address: 'CourseHub Corporate Office'
      },
      theme: {
        color: '#F37254'
      }
    };
 
    const rzp1 = new (window as any).Razorpay(options); 
    rzp1.open(); 
  }

  closePaymentModal() {
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
      paymentModal.style.display = 'none';
    }
  }


  openModal(courseId:number){
    if(this.modal){
      this.modal.nativeElement.style.display='block';
      this.getCourseVideos(courseId)
    }
  }
  loadCourses(){
    this.masterSrv.getAllCourses().subscribe((res:IApiResponse)=>{
      this.courseList.set(res.data)
    },error=>{
      
    })
  }
  openFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
      modal.style.display = 'none';
    }
  } 
  submitFeedback(form: NgForm) {
    if (form.valid) {
      const feedbackList = JSON.parse(localStorage.getItem('feedbackList') || '[]');
        feedbackList.push(this.feedback);
        localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
   
      Swal.fire({   title : "Feedback",   text: "Feedback Submitted Successfully",   icon: "success"});

      this.closeFeedbackModal();
    } else {
      Swal.fire({   title: "Please complete",   text: "Please fill out all fields correctly",   icon: "warning"});

    }
    if (this.feedback.name && this.feedback.email && this.feedback.phone && this.feedback.message) {
      Swal.fire({   title: "Submitted",   text: "Feedback Submitted Successfully!",   icon: "success"});

      this.closeFeedbackModal();
    } else {
      Swal.fire({   title: "Please Complete",   text: "Please fill out all fields.",   icon: "warning"});
    }
  }

  getCourseVideos(courseId:number){
    this.masterSrv.getCourseVideosbyCourseId(courseId).subscribe((res:IApiResponse)=>{
      this.courseVideos=(res.data)
    },error=>{
      
    })
  }
}
