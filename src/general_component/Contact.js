import { useRef } from 'react';
import '../style/contact.css';
import emailjs from "@emailjs/browser";
import {useForm} from 'react-hook-form';

const Contact
 = () => {

  
  const sendFeedback = (ServiceID,TemplateID, variables) => {

    emailjs
    .send(ServiceID,TemplateID, variables, 'bv9WQRk9GmZDOOpMj')
    .then((Response) =>{
      console.log("success")
    })
    .catch((err) =>{

      console.error("il y'a une erreur");
    })
   };
   

  const {register, handleSubmit} = useForm()

const onsubmit = (data, r) =>{


console.log(data);
  alert("Votre mail a été envoyé avec succès ");
  const ServiceID = "service_gydom2v";
  const TemplateID = "template_abtaqvh";
   sendFeedback (ServiceID,TemplateID, {

      Nom : data.Nom,
      Email : data.Email,
      Message: data.Message,
      reply_to: r.target.reset(),

   });

}
    return ( 
        <div  className="Contact container container-fluid">
          <div className='connect'>
            <h1> Contactez-Nous </h1>
            <div className="contact">
            <form onSubmit={handleSubmit(onsubmit)}>
            <div className="mb-3">
    <label  className="form-label">Votre Nom Complet</label>
    <input type="text" className="form-control" name='Nom' id="Nom exampleInputText1" {...register('Nom')} />
  </div>
  <div className="mb-3">
    <label  className="form-label">Votre Adresse Email</label>
    <input type="email" className="form-control" name='Email' id="Email exampleInputEmail1" {...register('Email')} aria-describedby="emailHelp"/>
  </div>
  <div className="form-floating mb-3">
  <textarea className="form-control Text" name='Message' placeholder="Envoyez nous un message" id="Message floatingTextarea2" style={{height:"200px"}} {...register(('Message'))}></textarea>
  <label  >Message</label>
</div>
  <button type="submit" className="btn1 btn btn-primary" > Envoyer </button>
</form>
            </div>
            </div>
        </div>
     );
}
 
export default Contact
;