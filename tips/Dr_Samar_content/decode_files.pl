use HTML::Entities;
use strict;
use warnings;
use utf8;
binmode(STDOUT, ":utf8");
foreach my $file ("facebook_raw.html", "facebook_mbasic_raw.html") {
    if (open(my $fh, "<:encoding(UTF-8)", $file)) {
        my $content = do { local $/; <$fh> };
        my $decoded = decode_entities($content);
        $decoded =~ s/<[^>]+>/ /g;
        $decoded =~ s/\s+/ /g;
        my $out_file = $file; $out_file =~ s/\.html/.txt/;
        open(my $oh, ">:utf8", $out_file);
        print $oh $decoded;
        close($oh);
    }
}
