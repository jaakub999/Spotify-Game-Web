import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-insert-code',
  templateUrl: './insert-code.component.html'
})
export class InsertCodeComponent implements OnInit {

  @Input() show!: boolean;
  @Output() event: EventEmitter<string> = new EventEmitter<string>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\w{5}$/)]]
    });
  }

  onJoinEvent() {
    const code = this.form.get('code')?.value;

    if (code) {
      this.event.emit(code);
    }
  }

  cancel() {
    window.location.reload();
  }
}
