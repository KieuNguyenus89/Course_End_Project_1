import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../customer/customer';
import { MeetingSchedule } from './meeting-schedule';


@Injectable({
  providedIn: 'root'
})
export class MeetingScheduleService {

  baseUrl:string = "http://localhost:3000/clients"
  meetingListUrl:string = " http://localhost:3000/meetinglist"

  constructor(public http:HttpClient) { }

  getClientName():any {
    return this.http.get<any>(this.baseUrl)
  }

  loadMeetingList():Observable<MeetingSchedule[]>{
    return this.http.get<MeetingSchedule[]>(this.meetingListUrl)
  }

  createNewMeeting(meeting:any):any {
    return this.http.post(this.meetingListUrl,meeting)
  }

  updateMeetingDetails(meeting:any):any {
    return this.http.put(this.meetingListUrl + "/" + meeting.id, meeting)
  }

  deleteMeetingDetails(mid:any):any {
    return this.http.delete(this.meetingListUrl + "/" + mid)

  }
}
