import { Component, OnInit } from '@angular/core';
import { MeetingScheduleService } from './meeting-schedule.service';
import {FormGroup,FormControl} from '@angular/forms';
import { MeetingSchedule } from './meeting-schedule';

@Component({
  selector: 'app-meeting-schedule',
  templateUrl: './meeting-schedule.component.html',
  styleUrl: './meeting-schedule.component.css'
})
export class MeetingScheduleComponent implements OnInit  {
  // clients:any
  // selectedClient:any = {
  //   id:0, name:''
  // }

  meetingRef = new FormGroup ({
    id : new FormControl(),
    clientname: new FormControl(),    
    meetingtopic: new FormControl(),    
    numberofpeople: new FormControl(),    
    startime: new FormControl(),    
  })

  createBtn:string = "Create"

  meetings:Array<MeetingSchedule> = []

  constructor(public meetingScheduleService:MeetingScheduleService){}
  ngOnInit():void {
    this.loadAllMeeting()
    //this.showAllClientName()
  }

  // showAllClientName(){
  //   this.meetingScheduleService.getClientName().subscribe(
  //     (data:any)=> {
  //       this.clients = data,
  //       console.log(this.clients)       
  //   })
  // }

  loadAllMeeting() {
    this.meetingScheduleService.loadMeetingList().subscribe({
      next:(result:any)=> {
        this.meetings=result;
    },
    error:(error:any)=> {
        console.log(error)
    },
    complete:()=> {
        console.log("done!")
    }
    })
  }

  createMeeting() {
    console.log("abc" )
    let meeting = this.meetingRef.value
    console.log("abc" + meeting)   

    if(this.createBtn == "Create") {
      this.meetingScheduleService.createNewMeeting(meeting).subscribe({
        next:(result:any) => {
          console.log(result)
        },
        error:(error:any) => {
          console.log(error)
        },
        complete:() => {
          this.loadAllMeeting()
        }
      })
    } else {
      this.meetingScheduleService.updateMeetingDetails(meeting).subscribe({
        next:(result:any) => {
          console.log(result)
        },
        error:(error:any) =>{
          console.log(error)
        },
        complete:() =>{
          this.loadAllMeeting()
        }
      })

      
      this.createBtn = "Create"
    }
    this.meetingRef.reset()


  }

  

  updateMeeting(meeting:any):void {
    console.log(meeting)
    
    this.meetingRef.get("id")?.setValue(meeting.id)
    this.meetingRef.get("clientname")?.setValue(meeting.clientname)   
    this.meetingRef.get("meetingtopic")?.setValue(meeting.meetingtopic)
    this.meetingRef.get("numberofpeople")?.setValue(meeting.numberofpeople)
    this.meetingRef.get("startime")?.setValue(meeting.startime) 
    
    this.createBtn = "Update Client"
    

  }


  deleteMeeting(mid:any) {
    return this.meetingScheduleService.deleteMeetingDetails(mid).subscribe({
      next:(result:any)=> {
        console.log(result)
      },
      error:(error:any)=> {
        console.log(error);
      },
      complete:()=> {
        this.loadAllMeeting();
      }
    })

  }

}
