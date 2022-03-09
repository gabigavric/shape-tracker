import Triangle from './triangle.js';
import $ from 'jquery';
import 'bootstrap'; //the js for bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';//this goes after bootstrap so styles get applied correctly

$("form#triangle-checker-form").submit(function(event){
  event.preventDefault();

  //get inputs
  const length1 = $("input#length1").val();
  const length2 = $("input#length2").val();
  const length3 = $("input#length3").val();

  //create triangle
  const triangle = new Triangle(length1, length2, length3);

  //call method
  const response = triangle.checkType();

  //append response to ui
  $("#response").append("<p>" + response  + "</p>");
});