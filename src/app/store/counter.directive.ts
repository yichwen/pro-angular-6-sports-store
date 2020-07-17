import { Directive, ViewContainerRef, TemplateRef, Input, SimpleChanges } from "@angular/core";

// this is an example of structural directive
// this directive is applied to elements through a counter property
// relies on special features that Angular provides for creating content repeatedly
// this directive deletes all the content it has created and starts again when the number of pages changes
// this can be an expensive process in more complex directives
@Directive({
  selector: '[counterOf]'
})
export class CounterDirective {

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<Object>
  ) { }

  @Input('counterOf')
  counter: number;

  ngOnChanges(changes: SimpleChanges) {
    this.container.clear();
    for (let i = 0; i < this.counter; i++) {
      this.container.createEmbeddedView(this.template, new CounterDirectiveContext(i + 1));
    }
  }

}

class CounterDirectiveContext {
  constructor(public $implicit: any) {}
}