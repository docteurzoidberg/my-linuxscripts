Remplace le motd statique par un motd dynamique


Lancer ./update-motd

Puis editer /etc/pam.d/sshd pour que ca ressemble à ceci: 


from:




...
# Standard Un*x session setup and teardown.
@include common-session
 
# Print the status of the user's mailbox upon successful login.
session optional pam_mail.so standard noenv # [1]
...


to:


...
 # Standard Un*x session setup and teardown.
@include common-session
 
# Print the message of the day upon successful login.
session optional pam_exec.so type=open_session stdout /bin/run-parts /root/scripts/utils/motd/update-motd.d
session optional pam_motd.so
 
# Print the status of the user's mailbox upon successful login.
session optional pam_mail.so standard noenv # [1]
...
