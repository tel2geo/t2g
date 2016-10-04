<?php
/**
 * @file pdu-class.php
 * Copyright T2G Project
 * GNU License - GPL3
 * By Thibaut LOMBARD
 */

class pduencode
{
    var $cmd;

    function pduencode()
    {
        $this->set_pduencode_cmd();
        return;
    }
    
    function set_pduencode_cmd()
    {
        if (file_exists('/usr/local/bin/perl'))
        {
            $this->cmd = '/usr/local/bin/perl';
        }
        elseif (file_exists('/usr/bin/perl'))
        {
            $this->cmd = '/usr/bin/perl';
        }
        elseif (file_exists('/bin/perl'))
        {
            $this->cmd = '/bin/perl';
        }
        else
        {
            die("<h1>Erreur:</h1>\n<p>le programme perl est introuvable.</p>");
        }
    }
    
    function querytoenc($toencode) 
    {
              return nl2br(shell_exec($this->cmd .' -e \'@a=split(//,unpack("b*","'.escapeshellcmd($toencode).'")); for ($i=7; $i < $#a; $i+=8) { $a[$i]="" } print uc(unpack("H*", pack("b*", join("", @a)))).""\''));
    }
    function querytodec($todecode) 
    {
              return nl2br(shell_exec($this->cmd .' -e \'@a=split(//,unpack("b*", pack("H*","'.escapeshellcmd($todecode).'"))); for ($i=6; $i < $#a; $i+=7) {$a[$i].="0" } print pack("b*", join("", @a)).""\''));
    }
}
?>
