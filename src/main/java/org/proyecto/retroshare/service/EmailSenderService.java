package org.proyecto.retroshare.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

	@Autowired
	private JavaMailSender mailSender;
	
	
	public void sendSimpleEmail(String toEmail,String body) throws MessagingException {
		

        MimeMessage mimeMessage = mailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper
                = new MimeMessageHelper(mimeMessage);

        mimeMessageHelper.setFrom("retrosharecompany2021@gmail.com");
        mimeMessageHelper.setTo(toEmail);
        mimeMessageHelper.setText(body,true);
        mimeMessageHelper.setSubject("Correo de verificación");


        mailSender.send(mimeMessage);
		
		System.out.println("Mail Send...");
	}
}
